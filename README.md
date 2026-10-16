# 🚀 Automated Application Deployment Platform

An end-to-end DevOps project that automates **testing, Docker image building, security scanning, image publishing, and deployment to AWS EC2** using GitHub Actions, Docker, Terraform, AWS SSM, and GitHub OIDC.

## 📌 Project Overview

Whenever code is pushed to the `main` branch:

```text
Developer
   ↓
GitHub
   ↓
GitHub Actions CI
   ↓
Tests → Docker Build → Trivy Scan
   ↓
Docker Hub
   ↓
CI Success
   ↓
GitHub Actions CD
   ↓
AWS OIDC → AWS SSM
   ↓
EC2
   ↓
Docker Containers
   ↓
Live Application
```

The deployment does not require manually logging into the EC2 instance through SSH.

---

## 🏗️ Architecture

```text
                  GitHub
                     │
                     ▼
              GitHub Actions
                  CI / CD
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      Docker Hub             AWS OIDC
                                │
                                ▼
                              IAM
                                │
                                ▼
                              SSM
                                │
                                ▼
                              EC2
                         ┌──────┴──────┐
                         ▼             ▼
                     Backend       Frontend
                     Node.js        Nginx
                      :3000          :80
                         │             │
                         └─────┬───────┘
                               ▼
                        Docker Network
```

---

## 🛠️ Technologies

### Application
- HTML
- JavaScript
- Node.js
- Nginx

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- GitHub Actions OIDC
- Trivy
- Docker Hub
- Terraform

### AWS
- EC2
- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- IAM
- AWS Systems Manager

### OS
- Ubuntu 24.04

---

## 📂 Project Structure

```text
automated-application-deployment/
│
├── backend/
├── frontend/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── versions.tf
│   └── github-actions.tf
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── .gitignore
└── README.md
```

---

## ☁️ AWS Infrastructure

Terraform provisions:

- VPC
- Public Subnet
- Internet Gateway
- Route Table
- Security Group
- EC2 Instance
- IAM Role & Instance Profile
- AWS SSM configuration
- GitHub Actions OIDC IAM Role

AWS Region:

```text
ap-south-1
```

---

## 🔐 GitHub Actions OIDC

GitHub Actions authenticates with AWS using OIDC instead of permanent AWS access keys.

```text
GitHub Actions
      ↓
OIDC Token
      ↓
AWS IAM
      ↓
STS
      ↓
Temporary Credentials
```

This improves security by avoiding long-term AWS credentials in GitHub Secrets.

---

## 🐳 Docker

The application consists of:

```text
Backend
Node.js
Port 3000

Frontend
Nginx
Port 80
```

Both containers use:

```text
automated-deployment-network
```

The frontend communicates with the backend using:

```text
backend:3000
```

instead of relying on a container IP address.

---

## 🔄 CI Pipeline

The CI workflow:

```text
Git Push
   ↓
npm ci
   ↓
npm test
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Docker Hub Login
   ↓
Push Images
```

Docker images:

```text
tanveer7docker/automated-application-deployment-backend
tanveer7docker/automated-application-deployment-frontend
```

Images are published using `latest` and commit-based tags.

---

## 🚀 CD Pipeline

After CI succeeds:

```text
CI Success
   ↓
GitHub OIDC
   ↓
AWS IAM
   ↓
AWS SSM
   ↓
EC2
   ↓
Docker Pull
   ↓
Remove Old Containers
   ↓
Start Backend
   ↓
Start Frontend
```

AWS SSM runs the deployment commands remotely without requiring SSH.

---

## 🌐 Application Access

The application is available through the EC2 public IP:

```text
http://<EC2-PUBLIC-IP>
```

Example:

```text
http://13.206.122.139
```

Traffic flow:

```text
Internet
   ↓
EC2 Port 80
   ↓
Nginx
   ↓
Backend Container
```

---

## 🔒 Security Practices

This project demonstrates:

- GitHub Actions OIDC
- IAM roles instead of permanent AWS keys
- Terraform-managed IAM
- AWS SSM instead of SSH deployment
- Trivy vulnerability scanning
- Docker image scanning
- Docker Hub authentication using GitHub Secrets
- Least-privilege IAM permissions
- Private backend communication through Docker networking

---

## 🧪 Useful Commands

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

Check EC2 instance:

```bash
terraform output -raw instance_id
```

Check SSM:

```bash
aws ssm describe-instance-information \
  --region ap-south-1
```

Check Docker:

```bash
docker ps
docker images
docker network ls
```

---

## 🧹 Destroy Infrastructure

To avoid unnecessary AWS charges:

```bash
terraform destroy
```

The infrastructure can later be recreated using:

```bash
terraform init
terraform plan
terraform apply
```

---

## 🏆 Final Result

This project provides a complete automated path:

```text
Code Push
   ↓
Testing
   ↓
Docker Build
   ↓
Security Scan
   ↓
Docker Hub
   ↓
CI Success
   ↓
AWS OIDC
   ↓
AWS SSM
   ↓
EC2
   ↓
Docker Deployment
   ↓
Live Application
```

### ⭐ Project Highlights

```text
☁️ AWS
🏗️ Terraform
🐳 Docker
🔄 GitHub Actions CI/CD
🔐 OIDC Authentication
🛡️ Trivy
📦 Docker Hub
📡 AWS SSM
🖥️ EC2
🌐 Nginx
🔗 Docker Networking
🚀 Automated Deployment
```

---

## 👨‍💻 Author

**Tanveer Rabbani**  
B.Tech – Information Technology  
Cloud & DevOps Enthusiast

**GitHub:** https://github.com/tanveerrabbani5  
**LinkedIn:** https://www.linkedin.com/in/tanveer-rabbani-a-870729362/
