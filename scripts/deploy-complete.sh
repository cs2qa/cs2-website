#!/bin/bash

# CS2 Technologies - Complete Deployment Script
# This script builds, deploys to S3, and invalidates CloudFront cache

set -e

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 CS2 Technologies Complete Deployment Script"
echo "=============================================="
echo ""

# Step 1: Deploy to S3
echo "📦 Step 1: Deploying to S3..."
"$SCRIPT_DIR/deploy-to-s3.sh"

echo ""
echo "☁️  Step 2: Invalidating CloudFront cache..."
"$SCRIPT_DIR/invalidate-cache.sh"

echo ""
echo "🎉 Complete deployment finished!"
echo "================================"
echo "✅ Website built and deployed to S3"
echo "✅ CloudFront cache invalidated"
echo ""
echo "🌐 Your website should be live at:"
echo "   - https://cs2technologies.com"
echo "   - https://www.cs2technologies.com"
echo ""
echo "⏰ CloudFront cache invalidation takes 5-10 minutes to complete globally."