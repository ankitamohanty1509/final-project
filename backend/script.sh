docker build -t inventory-backend .
docker tag inventory-backend:latest 713881797197.dkr.ecr.us-east-1.amazonaws.com/inventory-backend
docker push 713881797197.dkr.ecr.us-east-1.amazonaws.com/inventory-backend
