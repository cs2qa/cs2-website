#!/bin/bash

# CS2 Technologies - CloudFront Cache Invalidation Script
# This script invalidates the CloudFront cache after deployment

set -e

echo "🔄 CS2 Technologies Cache Invalidation Script"
echo "============================================"

# Check if distribution ID file exists
if [ ! -f ".cloudfront-distribution-id" ]; then
    echo "❌ CloudFront distribution ID not found."
    echo "   Please run ./scripts/setup-cloudfront.sh first."
    exit 1
fi

DISTRIBUTION_ID=$(cat .cloudfront-distribution-id)

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