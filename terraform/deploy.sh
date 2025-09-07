#!/bin/bash
set -e

echo "🚀 Starting deployment for CS2 Technologies website..."

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo "❌ Terraform not initialized. Run 'terraform init' first."
    exit 1
fi

# Build Next.js application (with static export)
echo "📦 Building Next.js application with static export..."
cd ..
npm run build

# Return to terraform directory
cd terraform

# Get S3 bucket name
BUCKET=$(terraform output -raw s3_bucket_name 2>/dev/null)
if [ -z "$BUCKET" ]; then
    echo "❌ Could not get S3 bucket name. Make sure Terraform infrastructure is deployed."
    exit 1
fi

# Sync files to S3
echo "☁️  Uploading files to S3 bucket: $BUCKET"
aws s3 sync ../out/ s3://$BUCKET/ \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "_next/data/*"

# Upload HTML files with different cache settings
aws s3 sync ../out/ s3://$BUCKET/ \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "_next/data/*"

# Get CloudFront distribution ID
DIST_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null)
if [ -z "$DIST_ID" ]; then
    echo "⚠️  Could not get CloudFront distribution ID. Skipping cache invalidation."
else
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $DIST_ID \
        --paths "/*" \
        --output text \
        --query 'Invalidation.Id'
fi

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your website is available at:"
echo "   https://cs2technologies.com"
echo "   https://www.cs2technologies.com"
echo ""
echo "Note: DNS propagation may take up to 48 hours if you just configured the domains."