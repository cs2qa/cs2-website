#!/bin/bash
set -e

echo "🚀 Deploying Contact Form Email Infrastructure"
echo "=============================================="

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo "📦 Initializing Terraform..."
    terraform init
fi

# Create package.json for Lambda function
echo "📦 Preparing Lambda function..."
cat > lambda/contact-form/package.json << EOF
{
  "name": "contact-form-handler",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "aws-sdk": "^2.1450.0"
  }
}
EOF

echo ""
echo "🔧 Planning infrastructure changes..."
terraform plan -out=tfplan

echo ""
echo "📝 This will create:"
echo "   • AWS Lambda function for handling contact forms"
echo "   • API Gateway endpoint for form submissions"
echo "   • SES (Simple Email Service) configuration"
echo "   • IAM roles and policies"
echo ""
echo "⚠️  Important: You'll need to verify your email address in SES after deployment."
echo ""
read -p "Deploy contact form infrastructure? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Applying Terraform changes..."
    terraform apply tfplan
    
    echo ""
    echo "✅ Contact form infrastructure deployed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo ""
    echo "1. 🔐 Verify your email in AWS SES:"
    echo "   - Go to AWS Console > SES > Verified identities"
    echo "   - Verify info@cs2technologies.ca (check your email for verification link)"
    echo ""
    echo "2. 🌐 Add DNS records for email sending (optional but recommended):"
    terraform output ses_verification_tokens
    echo ""
    echo "3. 🧪 Test the API endpoint:"
    echo "   API URL: $(terraform output -raw contact_form_api_url)"
    echo ""
    echo "4. 🔧 Update your website contact forms to use this API"
    echo ""
    echo "Need help with any of these steps? Let me know!"
    
else
    echo "❌ Deployment cancelled"
    rm tfplan
    exit 1
fi

rm -f tfplan