      resource "aws_acm_certificate" "website" {
  provider = aws.us_east_1
  
  domain_name               = var.domain_names[0]
  subject_alternative_names = concat(
    slice(var.domain_names, 1, length(var.domain_names)),
    var.www_domain_names
  )
  
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${var.project_name}-certificate"
    Environment = var.environment
  }
}

resource "aws_acm_certificate_validation" "website" {
  provider = aws.us_east_1
  
  certificate_arn = aws_acm_certificate.website.arn
  
  lifecycle {
    create_before_destroy = true
  }
}