# ========================================
# Contact Form Email Infrastructure
# ========================================

# Lambda Execution Role
resource "aws_iam_role" "contact_form_lambda" {
  name = "${var.project_name}-contact-form-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Create ZIP file for Lambda function
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/contact-form"
  output_path = "${path.module}/lambda/contact-form.zip"
}

# DynamoDB table for rate limiting
resource "aws_dynamodb_table" "rate_limits" {
  name           = "${var.project_name}-contact-rate-limits"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  range_key      = "timestamp"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    Name        = "${var.project_name}-rate-limits"
    Environment = var.environment
  }
}

# Lambda Execution Policy
resource "aws_iam_role_policy" "contact_form_lambda" {
  role = aws_iam_role.contact_form_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ]
        Resource = aws_dynamodb_table.rate_limits.arn
      }
    ]
  })
}

# Lambda Function
resource "aws_lambda_function" "contact_form" {
  filename         = "${path.module}/lambda/contact-form.zip"
  function_name    = "${var.project_name}-contact-form"
  role            = aws_iam_role.contact_form_lambda.arn
  handler         = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime         = "nodejs18.x"
  timeout         = 30

  environment {
    variables = {
      RECIPIENT_EMAIL   = var.contact_email
      SENDER_EMAIL     = "noreply@cs2technologies.ca"
      RATE_LIMIT_TABLE = aws_dynamodb_table.rate_limits.name
      ALLOWED_ORIGINS  = join(",", [
        "https://${var.domain_name}",
        "https://www.${var.domain_name}",
        "http://localhost:3000"
      ])
    }
  }

  tags = {
    Name        = "${var.project_name}-contact-form"
    Environment = var.environment
  }
}

# API Gateway REST API
resource "aws_api_gateway_rest_api" "contact_form" {
  name        = "${var.project_name}-contact-form-api"
  description = "API for contact form submissions"

  endpoint_configuration {
    types = ["EDGE"]
  }
}

# API Gateway Resource
resource "aws_api_gateway_resource" "contact" {
  rest_api_id = aws_api_gateway_rest_api.contact_form.id
  parent_id   = aws_api_gateway_rest_api.contact_form.root_resource_id
  path_part   = "contact"
}

# API Gateway Method - POST
resource "aws_api_gateway_method" "contact_post" {
  rest_api_id   = aws_api_gateway_rest_api.contact_form.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "POST"
  authorization = "NONE"
}

# API Gateway Method - OPTIONS (for CORS)
resource "aws_api_gateway_method" "contact_options" {
  rest_api_id   = aws_api_gateway_rest_api.contact_form.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Lambda Integration for POST
resource "aws_api_gateway_integration" "contact_post" {
  rest_api_id = aws_api_gateway_rest_api.contact_form.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_post.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.contact_form.invoke_arn
}

# Lambda Integration for OPTIONS
resource "aws_api_gateway_integration" "contact_options" {
  rest_api_id = aws_api_gateway_rest_api.contact_form.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.contact_form.invoke_arn
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "contact_form" {
  depends_on = [
    aws_api_gateway_integration.contact_post,
    aws_api_gateway_integration.contact_options
  ]

  rest_api_id = aws_api_gateway_rest_api.contact_form.id
  stage_name  = var.environment

  lifecycle {
    create_before_destroy = true
  }
}

# Lambda Permission for API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.contact_form.execution_arn}/*/*"
}

# SES Domain Identity
resource "aws_ses_domain_identity" "main" {
  domain = var.domain_name
}

# SES Domain Verification Record
resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

# SES Email Identity for recipient
resource "aws_ses_email_identity" "contact" {
  email = var.contact_email
}

# SES Email Identity for sender
resource "aws_ses_email_identity" "sender" {
  email = "noreply@cs2technologies.ca"
}

# Output the API endpoint
output "contact_form_api_url" {
  description = "URL for the contact form API"
  value       = "${aws_api_gateway_deployment.contact_form.invoke_url}/contact"
}

output "ses_verification_tokens" {
  description = "Add these CNAME records to your DNS for SES verification"
  value = [
    for token in aws_ses_domain_dkim.main.dkim_tokens : {
      name  = "${token}._domainkey.${var.domain_name}"
      type  = "CNAME"
      value = "${token}.dkim.amazonses.com"
    }
  ]
  sensitive = false
}