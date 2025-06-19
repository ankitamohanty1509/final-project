docker build -t inventory-frontend .
docker tag inventory-frontend:latest 713881797197.dkr.ecr.us-east-1.amazonaws.com/inventory-frontend
docker push 713881797197.dkr.ecr.us-east-1.amazonaws.com/inventory-frontend
