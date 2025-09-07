# Terraform Infrastructure for CS2 Technologies Website

This Terraform configuration deploys the CS2 Technologies website to AWS using S3 and CloudFront.

## Architecture

- **S3 Bucket**: Hosts the static website files
- **CloudFront**: CDN for global distribution with HTTPS
- **ACM Certificate**: SSL/TLS certificate for both domains
- **Multiple Domains**: Supports cs2technologies.ca and cs2technologies.com

## Prerequisites

1. AWS CLI configured with appropriate credentials
2. Terraform installed (>= 1.0)
3. Domains configured in GoDaddy (or transferred to Route 53)

## Setup Instructions

### 1. Initialize Terraform

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
```

### 2. Create S3 Backend Bucket (First Time Only)

```bash
aws s3 mb s3://cs2technologies-terraform-state --region us-east-1
aws s3api put-bucket-versioning \
  --bucket cs2technologies-terraform-state \
  --versioning-configuration Status=Enabled
```

### 3. Plan and Apply

```bash
terraform plan
terraform apply
```

### 4. DNS Configuration

After running Terraform, you'll need to configure DNS:

#### Option A: Using GoDaddy (Current Setup)

1. Get the CloudFront domain from Terraform output:
   ```bash
   terraform output cloudfront_domain_name
   ```

2. In GoDaddy DNS settings for both domains:
   - Add CNAME record: `www` → CloudFront domain (e.g., `d1234567.cloudfront.net`)
   - Add A record: `@` → CloudFront IPs (use AWS CloudFront IP ranges)

3. For ACM certificate validation:
   ```bash
   terraform output acm_validation_records
   ```
   Add the CNAME records shown to GoDaddy DNS for both domains.

#### Option B: Using Route 53 (Recommended)

Transfer domains to Route 53 for better integration. Add this to `route53.tf`:

```hcl
resource "aws_route53_zone" "domains" {
  for_each = toset(var.domain_names)
  name     = each.value
}

resource "aws_route53_record" "root" {
  for_each = aws_route53_zone.domains
  
  zone_id = each.value.zone_id
  name    = each.key
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  for_each = aws_route53_zone.domains
  
  zone_id = each.value.zone_id
  name    = "www.${each.key}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
```

## Deployment

### Build and Export Next.js App

```bash
# In the project root
npm run build
npx next export
```

### Upload to S3

```bash
# Get bucket name
BUCKET=$(terraform output -raw s3_bucket_name)

# Sync files
aws s3 sync ../out/ s3://$BUCKET/ --delete

# Invalidate CloudFront cache
DIST_ID=$(terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
```

## Automated Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Building Next.js app..."
cd ..
npm run build
npx next export

echo "Deploying to S3..."
cd terraform
BUCKET=$(terraform output -raw s3_bucket_name)
aws s3 sync ../out/ s3://$BUCKET/ --delete

echo "Invalidating CloudFront cache..."
DIST_ID=$(terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"

echo "Deployment complete!"
echo "Website URLs:"
terraform output website_urls
```

Make it executable: `chmod +x deploy.sh`

## Cost Estimates

- **S3 Storage**: ~$0.50/month (20GB)
- **CloudFront**: ~$5-10/month (depends on traffic)
- **Route 53** (if used): $1/month for 2 hosted zones
- **Total**: ~$7-15/month

## Useful Commands

```bash
# Check infrastructure status
terraform show

# Destroy infrastructure (careful!)
terraform destroy

# Format Terraform files
terraform fmt -recursive

# Validate configuration
terraform validate
```

## Troubleshooting

1. **Certificate Validation Pending**: Make sure DNS CNAME records are added correctly
2. **403 Errors**: Check S3 bucket policy and CloudFront OAC configuration
3. **404 on Routes**: Next.js export doesn't support dynamic routes; use static generation

## Security Notes

- S3 bucket is private; access only through CloudFront
- TLS 1.2+ enforced
- CloudFront Origin Access Control (OAC) for secure S3 access