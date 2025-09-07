variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_names" {
  description = "List of domain names for the website"
  type        = list(string)
  default     = ["cs2technologies.com"]
}

variable "www_domain_names" {
  description = "List of www domain names for the website"
  type        = list(string)
  default     = ["www.cs2technologies.com"]
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "cs2technologies"
}