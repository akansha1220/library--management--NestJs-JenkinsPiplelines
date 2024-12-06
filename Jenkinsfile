pipeline {
    agent any
    
    environment {
        ECR_REPO = "<061051218540>.dkr.ecr.ap-south-1.amazonaws.com/jenkins-demo"
        AWS_REGION = "ap-south-1"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t my-library-app .'
                }
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    // ECR login using AWS CLI
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO'
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    // Push Docker image to ECR
                    sh 'docker tag my-library-app:latest $ECR_REPO:latest'
                    sh 'docker push $ECR_REPO:latest'
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                script {
                    // SSH into EC2 instance and deploy Docker container
                    sh #!/bin/bash
                        ssh -i "C:/Users/Nishi/Desktop/imp keys/Akansha.pem" ec2-user@ip-172-31-5-35 
                        "
                            docker pull $ECR_REPO:latest &&
                            docker run -d -p 80:3000 --name nestjs-container $ECR_REPO:latest
                        "
                
                }
            }
        }
    }
}
