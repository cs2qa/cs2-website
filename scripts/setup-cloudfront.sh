#!/bin/bash

# CS2 Technologies - CloudFront Setup Script
# This script creates and configures a CloudFront distribution

set -e

echo "☁️  CS2 Technologies CloudFront Setup Script"
echo "==========================================="

# Load configuration
CONFIG_FILE="aws-config.json"
BUCKET_NAME=$(jq -r '.s3.bucketName' $CONFIG_FILE)
REGION=$(jq -r '.s3.region' $CONFIG_FILE)
DOMAIN_NAME=$(jq -r '.domain.domainName' $CONFIG_FILE)
CERTIFICATE_ARN=$(jq -r '.domain.certificateArn' $CONFIG_FILE)

# Check if distribution already exists
echo "🔍 Checking for existing CloudFront distribution..."
EXISTING_DIST=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='${BUCKET_NAME}.s3.amazonaws.com'].Id" \
    --output text 2>/dev/null || echo "")

if [ -n "$EXISTING_DIST" ]; then
    echo "✅ CloudFront distribution already exists: ${EXISTING_DIST}"
    echo "🔄 To update, run: ./scripts/invalidate-cache.sh"
    exit 0
fi

# Create CloudFront distribution configuration
echo "📝 Creating CloudFront distribution configuration..."
cat > /tmp/cf-distribution.json <<EOF
{
    "CallerReference": "cs2-technologies-$(date +%s)",
    "Comment": "CS2 Technologies Website Distribution",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "${BUCKET_NAME}",
                "DomainName": "${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 3,
                        "Items": ["TLSv1", "TLSv1.1", "TLSv1.2"]
                    }
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "${BUCKET_NAME}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "Compress": true,
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        }
    },
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/404.html",
                "ResponseCode": "404",
                "ErrorCachingMinTTL": 300
            },
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
    }
}
EOF

# Add custom domain configuration if certificate ARN is provided
if [ "$CERTIFICATE_ARN" != "null" ] && [ "$CERTIFICATE_ARN" != "" ]; then
    echo "🔐 Configuring custom domain with SSL certificate..."
    jq '.Aliases = {"Quantity": 2, "Items": ["'$DOMAIN_NAME'", "www.'$DOMAIN_NAME'"]} | 
        .ViewerCertificate = {
            "ACMCertificateArn": "'$CERTIFICATE_ARN'",
            "SSLSupportMethod": "sni-only",
            "MinimumProtocolVersion": "TLSv1.2_2021"
        }' /tmp/cf-distribution.json > /tmp/cf-distribution-ssl.json
    mv /tmp/cf-distribution-ssl.json /tmp/cf-distribution.json
fi

# Create CloudFront distribution
echo "🚀 Creating CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/cf-distribution.json \
    --query "Distribution.Id" \
    --output text)

echo "✅ CloudFront distribution created: ${DISTRIBUTION_ID}"

# Get distribution domain name
DISTRIBUTION_DOMAIN=$(aws cloudfront get-distribution \
    --id "${DISTRIBUTION_ID}" \
    --query "Distribution.DomainName" \
    --output text)

echo ""
echo "🎉 CloudFront setup complete!"
echo "================================"
echo "Distribution ID: ${DISTRIBUTION_ID}"
echo "Distribution URL: https://${DISTRIBUTION_DOMAIN}"
echo ""
echo "📝 Next steps:"
echo "1. Wait 15-20 minutes for distribution to deploy"
echo "2. Update your DNS records:"
echo "   - Create CNAME for ${DOMAIN_NAME} → ${DISTRIBUTION_DOMAIN}"
echo "   - Create CNAME for www.${DOMAIN_NAME} → ${DISTRIBUTION_DOMAIN}"
echo "3. Test your website at https://${DISTRIBUTION_DOMAIN}"

# Save distribution ID for future use
echo "${DISTRIBUTION_ID}" > .cloudfront-distribution-id
echo "💾 Distribution ID saved to .cloudfront-distribution-id"