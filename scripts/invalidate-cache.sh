#!/bin/bash

# CS2 Technologies - CloudFront Cache Invalidation Script
# This script invalidates the CloudFront cache after deployment

set -e

echo "🔄 CS2 Technologies Cache Invalidation Script"
echo "============================================"

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Change to project root directory
cd "$PROJECT_ROOT"

# Load configuration
CONFIG_FILE="$PROJECT_ROOT/aws-config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Configuration file not found: $CONFIG_FILE"
    echo "   Please ensure aws-config.json exists in the project root."
    exit 1
fi

BUCKET_NAME=$(jq -r '.s3.bucketName' "$CONFIG_FILE")

# Try to get distribution ID from file first, then search for it
if [ -f ".cloudfront-distribution-id" ]; then
    DISTRIBUTION_ID=$(cat .cloudfront-distribution-id)
else
    echo "🔍 Searching for existing CloudFront distribution..."
    DISTRIBUTION_ID=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Comment=='CS2 Technologies Website Distribution'].Id" \
        --output text 2>/dev/null || echo "")
    
    if [ -z "$DISTRIBUTION_ID" ] || [ "$DISTRIBUTION_ID" = "None" ]; then
        echo "❌ CloudFront distribution not found."
        echo "   Please run ./scripts/setup-cloudfront.sh first."
        exit 1
    fi
    
    # Save the found distribution ID
    echo "${DISTRIBUTION_ID}" > .cloudfront-distribution-id
    echo "💾 Distribution ID saved to .cloudfront-distribution-id"
fi

echo "📋 Distribution ID: ${DISTRIBUTION_ID}"

# Create invalidation
echo "🚀 Creating cache invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text)

echo "✅ Invalidation created: ${INVALIDATION_ID}"

# Check invalidation status
echo "⏳ Checking invalidation status..."
STATUS=$(aws cloudfront get-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --id "${INVALIDATION_ID}" \
    --query "Invalidation.Status" \
    --output text)

echo "📊 Current status: ${STATUS}"

if [ "$STATUS" = "InProgress" ]; then
    echo "⏰ Invalidation in progress. This usually takes 5-10 minutes."
    echo "   Check status with:"
    echo "   aws cloudfront get-invalidation --distribution-id ${DISTRIBUTION_ID} --id ${INVALIDATION_ID}"
else
    echo "✅ Invalidation completed!"
fi