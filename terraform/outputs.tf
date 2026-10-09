output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.app.id
}

output "public_ip" {
  description = "EC2 public IP address"
  value       = aws_instance.app.public_ip
}

output "application_url" {
  description = "HTTP URL for the application after deployment"
  value       = "http://${aws_instance.app.public_ip}"
}

output "vpc_id" {
  description = "Created VPC ID"
  value       = aws_vpc.main.id
}
