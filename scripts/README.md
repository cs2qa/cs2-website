# Deployment Scripts

This directory contains scripts to deploy the CS2 Technologies website to AWS S3 and CloudFront.

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **Node.js and npm** installed

3. **jq** installed (for JSON parsing)
   ```bash
   # macOS
   brew install jq
   
   # Ubuntu/Debian
   sudo apt-get install jq
   ```

## Scripts Overview

### `deploy-complete.sh` ⭐ **Recommended**
Complete deployment script that builds, deploys to S3, and invalidates CloudFront cache.

```bash
./scripts/deploy-complete.sh
```

### Individual Scripts

#### `deploy-to-s3.sh`
Builds the Next.js application and deploys to S3.

```bash
./scripts/deploy-to-s3.sh
```

**What it does:**
- Builds the Next.js application (`npm run build`)
- Creates S3 bucket if it doesn't exist
- Configures static website hosting
- Sets up public access
- Uploads all files with appropriate cache headers

#### `setup-cloudfront.sh`
Sets up CloudFront distribution (only needed once).

```bash
./scripts/setup-cloudfront.sh
```

**What it does:**
- Creates CloudFront distribution
- Configures SSL certificate if available
- Sets up custom domains
- Configures caching rules

#### `invalidate-cache.sh`
Invalidates CloudFront cache after deployment.

```bash
./scripts/invalidate-cache.sh
```

**What it does:**
- Finds the CloudFront distribution
- Creates cache invalidation for all paths (`/*`)
- Shows invalidation status

## Configuration

All scripts read from `aws-config.json` in the project root:

```json
{
  "s3": {
    "bucketName": "cs2technologies-website",
    "region": "us-east-1"
  },
  "cloudfront": {
    "distributionComment": "CS2 Technologies Website Distribution"
  },
  "domain": {
    "domainName": "cs2technologies.ca",
    "certificateArn": "arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID"
  }
}
```

## Quick Start

**From project root directory:**

1. **First-time setup:**
   ```bash
   ./scripts/setup-cloudfront.sh  # Only needed once
   ```

2. **Regular deployments:**
   ```bash
   ./scripts/deploy-complete.sh
   ```

**From scripts directory:**

1. **First-time setup:**
   ```bash
   cd scripts
   ./setup-cloudfront.sh  # Only needed once
   ```

2. **Regular deployments:**
   ```bash
   cd scripts
   ./deploy-complete.sh
   ```

> **Note:** Scripts can be run from either the project root or the scripts directory.

## URLs

After deployment, your website will be available at:

- **S3 Website URL:** http://cs2technologies-website.s3-website-us-east-1.amazonaws.com
- **CloudFront URL:** https://d2eovrvig9u74l.cloudfront.net
- **Custom Domains:** 
  - https://cs2technologies.com
  - https://www.cs2technologies.com

## Troubleshooting

### Permission Errors
Make sure your AWS credentials have the necessary permissions:
- S3: `s3:*`
- CloudFront: `cloudfront:*`
- IAM: `iam:GetUser` (for credential validation)

### Script Permission Errors
```bash
chmod +x scripts/*.sh
```

### Build Errors
Make sure you have all dependencies installed:
```bash
npm install
```

### jq Not Found
Install jq for JSON parsing:
```bash
# macOS
brew install jq

# Ubuntu/Debian  
sudo apt-get install jq
```