#!/bin/bash

# Get API URL from terraform output
API_URL=$(terraform output -raw contact_form_api_url 2>/dev/null)

if [ -z "$API_URL" ]; then
    echo "❌ Could not get API URL. Make sure the infrastructure is deployed."
    echo "Run: ./deploy-contact-form.sh first"
    exit 1
fi

echo "🧪 Testing Contact Form API"
echo "=========================="
echo "API URL: $API_URL"
echo ""

# Test data
TEST_DATA='{
  "name": "Test User",
  "email": "test@example.com",
  "company": "Test Company",
  "phone": "+1-555-123-4567",
  "subject": "API Test",
  "message": "This is a test message from the API test script."
}'

echo "📤 Sending test request..."
echo ""

# Make the request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "$API_URL")

# Extract response body and status code
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
STATUS_CODE=$(echo "$RESPONSE" | tail -n1)

echo "📥 Response:"
echo "Status Code: $STATUS_CODE"
echo "Response Body: $RESPONSE_BODY"
echo ""

if [ "$STATUS_CODE" = "200" ]; then
    echo "✅ API test successful!"
    echo ""
    echo "📧 Check your email (info@cs2technologies.ca) for the test message."
    echo ""
    echo "🎉 Your contact form is ready to use!"
    echo "Don't forget to update your .env file with:"
    echo "NEXT_PUBLIC_CONTACT_API_URL=$API_URL"
else
    echo "❌ API test failed!"
    echo ""
    echo "💡 Troubleshooting steps:"
    echo "1. Check if your email is verified in AWS SES"
    echo "2. Check Lambda function logs in AWS CloudWatch"
    echo "3. Verify API Gateway configuration"
fi