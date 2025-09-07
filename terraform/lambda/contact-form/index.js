const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

const sesClient = new SESClient({ region: 'us-east-1' });
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const dynamodb = DynamoDBDocumentClient.from(dynamoClient);

// Configuration
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@cs2technologies.ca';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'noreply@cs2technologies.ca';
const RATE_LIMIT_TABLE = process.env.RATE_LIMIT_TABLE || 'cs2-contact-rate-limits';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
  'https://cs2technologies.com',
  'https://www.cs2technologies.com',
  'http://localhost:3000'
];

// Rate limiting configuration
const RATE_LIMITS = {
  perIP: { count: 5, windowMinutes: 60 },      // 5 emails per IP per hour
  perEmail: { count: 3, windowMinutes: 60 },   // 3 emails per email address per hour
  global: { count: 50, windowMinutes: 60 }     // 50 total emails per hour
};

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event));
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCorsHeaders(event.headers.origin),
      body: ''
    };
  }
  
  try {
    // Get client IP
    const clientIP = event.requestContext?.identity?.sourceIp || 'unknown';
    
    // Parse request body
    const body = JSON.parse(event.body);
    const { name, email, company, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(event.headers.origin),
        body: JSON.stringify({ 
          error: 'Missing required fields: name, email, subject, and message are required' 
        })
      };
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(event.headers.origin),
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }
    
    // Spam detection
    if (isSpam(name, email, subject, message)) {
      console.log('Spam detected:', { clientIP, email, subject });
      return {
        statusCode: 429,
        headers: getCorsHeaders(event.headers.origin),
        body: JSON.stringify({ error: 'Message appears to be spam' })
      };
    }
    
    // Rate limiting check
    const rateLimitResult = await checkRateLimit(clientIP, email);
    if (!rateLimitResult.allowed) {
      console.log('Rate limit exceeded:', { clientIP, email, reason: rateLimitResult.reason });
      return {
        statusCode: 429,
        headers: getCorsHeaders(event.headers.origin),
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        })
      };
    }
    
    // Prepare email parameters
    const emailParams = {
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL]
      },
      Message: {
        Subject: {
          Data: `[CS2 Website] ${subject}`,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: formatTextEmail(name, email, company, phone, subject, message),
            Charset: 'UTF-8'
          },
          Html: {
            Data: formatHtmlEmail(name, email, company, phone, subject, message),
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [email]
    };
    
    // Send email via SES
    const sendEmailCommand = new SendEmailCommand(emailParams);
    const result = await sesClient.send(sendEmailCommand);
    console.log('Email sent successfully:', result.MessageId);
    
    // Try to send auto-reply to user (may fail in SES sandbox mode)
    try {
      const autoReplyParams = {
        Source: SENDER_EMAIL,
        Destination: {
          ToAddresses: [email]
        },
        Message: {
          Subject: {
            Data: 'Thank you for contacting CS2 Technologies',
            Charset: 'UTF-8'
          },
          Body: {
            Html: {
              Data: formatAutoReplyEmail(name),
              Charset: 'UTF-8'
            }
          }
        }
      };
      
      const autoReplyCommand = new SendEmailCommand(autoReplyParams);
      await sesClient.send(autoReplyCommand);
      console.log('Auto-reply sent successfully');
    } catch (autoReplyError) {
      console.log('Auto-reply failed (likely due to SES sandbox mode):', autoReplyError.message);
      // Continue without failing the entire request
    }
    
    return {
      statusCode: 200,
      headers: getCorsHeaders(event.headers.origin),
      body: JSON.stringify({
        message: 'Email sent successfully',
        messageId: result.MessageId
      })
    };
    
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(event.headers.origin),
      body: JSON.stringify({
        error: 'Failed to send email. Please try again later.'
      })
    };
  }
};

function getCorsHeaders(origin) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else {
    headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGINS[0];
  }
  
  return headers;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function formatTextEmail(name, email, company, phone, subject, message) {
  return `
New Contact Form Submission

From: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This email was sent from the CS2 Technologies website contact form.
  `.trim();
}

function formatHtmlEmail(name, email, company, phone, subject, message) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-left: 10px; color: #333; }
    .message-box { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">From:</span>
        <span class="value">${name}</span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value"><a href="mailto:${email}">${email}</a></span>
      </div>
      <div class="field">
        <span class="label">Company:</span>
        <span class="value">${company || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">${phone || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="label">Subject:</span>
        <span class="value">${subject}</span>
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function formatAutoReplyEmail(name) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting CS2 Technologies</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to CS2 Technologies. We have received your message and appreciate your interest in our services.</p>
      <p>Our team will review your inquiry and get back to you within 24 business hours.</p>
      <p>In the meantime, feel free to explore our website for more information about our AI solutions, healthcare technology, and enterprise services.</p>
      <p>Best regards,<br>The CS2 Technologies Team</p>
    </div>
    <div class="footer">
      <p>CS2 Technologies | Toronto, Canada<br>
      <a href="https://cs2technologies.com">www.cs2technologies.com</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Spam detection function
function isSpam(name, email, subject, message) {
  const spamKeywords = [
    'viagra', 'cialis', 'loan', 'credit', 'casino', 'bitcoin', 'crypto',
    'make money', 'work from home', 'guaranteed', 'free money', 'investment opportunity',
    'click here', 'limited time', 'act now', 'congratulations you won'
  ];
  
  const content = `${name} ${email} ${subject} ${message}`.toLowerCase();
  
  // Check for spam keywords
  if (spamKeywords.some(keyword => content.includes(keyword))) {
    return true;
  }
  
  // Check for suspicious patterns
  if (message.length < 10) return true; // Too short
  if (message.length > 5000) return true; // Too long
  if ((message.match(/http/g) || []).length > 3) return true; // Too many links
  if (/(.)\1{10,}/.test(message)) return true; // Repeated characters
  
  return false;
}

// Rate limiting function
async function checkRateLimit(clientIP, email) {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (RATE_LIMITS.perIP.windowMinutes * 60);
  
  try {
    // Check IP-based rate limit
    const ipKey = `ip-${clientIP}`;
    const ipResult = await getRateLimitCount(ipKey, windowStart);
    if (ipResult >= RATE_LIMITS.perIP.count) {
      return { 
        allowed: false, 
        reason: 'IP rate limit exceeded',
        retryAfter: RATE_LIMITS.perIP.windowMinutes * 60 
      };
    }
    
    // Check email-based rate limit
    const emailKey = `email-${email}`;
    const emailResult = await getRateLimitCount(emailKey, windowStart);
    if (emailResult >= RATE_LIMITS.perEmail.count) {
      return { 
        allowed: false, 
        reason: 'Email rate limit exceeded',
        retryAfter: RATE_LIMITS.perEmail.windowMinutes * 60 
      };
    }
    
    // Check global rate limit
    const globalKey = 'global';
    const globalResult = await getRateLimitCount(globalKey, windowStart);
    if (globalResult >= RATE_LIMITS.global.count) {
      return { 
        allowed: false, 
        reason: 'Global rate limit exceeded',
        retryAfter: RATE_LIMITS.global.windowMinutes * 60 
      };
    }
    
    // Record this request
    await Promise.all([
      recordRateLimit(ipKey, now),
      recordRateLimit(emailKey, now),
      recordRateLimit(globalKey, now)
    ]);
    
    return { allowed: true };
    
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Allow on error (fail open)
    return { allowed: true };
  }
}

// Helper function to get rate limit count
async function getRateLimitCount(key, windowStart) {
  try {
    const scanCommand = new ScanCommand({
      TableName: RATE_LIMIT_TABLE,
      FilterExpression: '#pk = :key AND #ts > :windowStart',
      ExpressionAttributeNames: {
        '#pk': 'pk',
        '#ts': 'timestamp'
      },
      ExpressionAttributeValues: {
        ':key': key,
        ':windowStart': windowStart
      }
    });
    
    const result = await dynamodb.send(scanCommand);
    return result.Items.length;
  } catch (error) {
    console.error('Error getting rate limit count:', error);
    return 0; // Fail open
  }
}

// Helper function to record rate limit entry
async function recordRateLimit(key, timestamp) {
  try {
    const putCommand = new PutCommand({
      TableName: RATE_LIMIT_TABLE,
      Item: {
        pk: key,
        timestamp: timestamp,
        ttl: timestamp + (24 * 60 * 60) // TTL for 24 hours
      }
    });
    
    await dynamodb.send(putCommand);
  } catch (error) {
    console.error('Error recording rate limit:', error);
    // Continue anyway
  }
}