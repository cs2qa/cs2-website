#!/bin/bash
set -e

echo "🔄 Updating CloudFront configuration for proper URL routing..."
echo "=================================================="

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo "📦 Initializing Terraform..."
    terraform init
fi

echo ""
echo "📋 Planning infrastructure changes..."
terraform plan -out=tfplan

echo ""
echo "⚠️  The following changes will be applied:"
echo "1. Add CloudFront Function for URL rewriting"
echo "2. Update CloudFront distribution to use the function"
echo ""
read -p "Do you want to apply these changes? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Applying Terraform changes..."
    terraform apply tfplan
    
    echo ""
    echo "✅ Infrastructure updated successfully!"
    echo ""
    echo "🔄 CloudFront distribution is updating. This may take 5-10 minutes."
    echo ""
    echo "Next steps:"
    echo "1. Wait for CloudFront distribution to finish deploying"
    echo "2. Run ./deploy.sh to redeploy your website"
    echo "3. Test URLs like /services, /about, etc."
else
    echo "❌ Update cancelled"
    rm tfplan
    exit 1
fi

rm -f tfplan