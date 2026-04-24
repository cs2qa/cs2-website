#!/bin/bash

# CS2 Technologies - AWS S3 Deployment Script
# This script builds and deploys the Next.js static site to AWS S3.
#
# AWS profile: defaults to "gws" (the cs2-dev-user IAM principal that owns
# the cs2technologies-website bucket). Override by exporting AWS_PROFILE
# before invoking, e.g.  AWS_PROFILE=somethingelse ./scripts/deploy-to-s3.sh

set -e

export AWS_PROFILE="${AWS_PROFILE:-gws}"

echo "🚀 CS2 Technologies Website Deployment Script"
echo "============================================"
echo "🔑 Using AWS profile: ${AWS_PROFILE}"

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load configuration
CONFIG_FILE="$PROJECT_ROOT/aws-config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Configuration file not found: $CONFIG_FILE"
    echo "   Please ensure aws-config.json exists in the project root."
    exit 1
fi

BUCKET_NAME=$(jq -r '.s3.bucketName' "$CONFIG_FILE")
REGION=$(jq -r '.s3.region' "$CONFIG_FILE")

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials for the selected profile
echo "📋 Checking AWS credentials for profile '${AWS_PROFILE}'..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured for profile '${AWS_PROFILE}'."
    echo "   Either run 'aws configure --profile ${AWS_PROFILE}' to set it up,"
    echo "   or pick a different profile: AWS_PROFILE=<name> ./scripts/deploy-to-s3.sh"
    exit 1
fi

# Change to project root directory
cd "$PROJECT_ROOT"

# Build the Next.js application
echo "🔨 Building Next.js application..."
npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Build failed. 'out' directory not found."
    exit 1
fi

# Create S3 bucket if it doesn't exist
echo "🪣 Checking S3 bucket..."
if aws s3 ls "s3://${BUCKET_NAME}" --region "${REGION}" 2>&1 | grep -q 'NoSuchBucket'; then
    echo "📦 Creating bucket ${BUCKET_NAME}..."
    aws s3 mb "s3://${BUCKET_NAME}" --region "${REGION}"
    
    # Enable static website hosting
    echo "🌐 Enabling static website hosting..."
    aws s3 website "s3://${BUCKET_NAME}" \
        --index-document index.html \
        --error-document 404.html \
        --region "${REGION}"
    
    # Disable block public access
    echo "🔓 Disabling block public access..."
    aws s3api put-public-access-block \
        --bucket "${BUCKET_NAME}" \
        --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
        --region "${REGION}"
    
    # Set bucket policy for public access
    echo "🔓 Setting bucket policy..."
    cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
        }
    ]
}
EOF
    aws s3api put-bucket-policy \
        --bucket "${BUCKET_NAME}" \
        --policy file:///tmp/bucket-policy.json \
        --region "${REGION}"
else
    echo "✅ Bucket ${BUCKET_NAME} exists"
fi

# Sync files to S3
echo "📤 Uploading files to S3..."
aws s3 sync out/ "s3://${BUCKET_NAME}" \
    --delete \
    --region "${REGION}" \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync out/ "s3://${BUCKET_NAME}" \
    --delete \
    --region "${REGION}" \
    --cache-control "public, max-age=3600" \
    --exclude "*" \
    --include "*.html" \
    --include "*.json" \
    --content-type "text/html"

echo "✅ Deployment complete!"
echo "🌐 Website URL: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
echo ""
echo "📝 Next steps:"
echo "1. Run ./scripts/setup-cloudfront.sh to set up CloudFront CDN"
echo "2. Configure your domain DNS to point to CloudFront"