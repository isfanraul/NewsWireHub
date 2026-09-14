cd terraform/
terraform init
terraform apply -target=aws_db_instance.newswirehub-db --auto-approve
terraform apply -target=aws_ecr_repository.newswirehub-ecr --auto-approve

cd ../backend
# AWS_ACCOUNT_ID and AWS_REGION must be set in the Jenkins environment/credentials
~/.local/bin/aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

export DB_HOST=`~/.local/bin/aws rds --region $AWS_REGION describe-db-instances --query "DBInstances[0].Endpoint.Address" | tr -d '"'`
~/./../jenkins_home/.sdkman/candidates/maven/current/bin/mvn clean install

docker build . -t newswirehub-ecr --build-arg db_host=`~/.local/bin/aws rds --region $AWS_REGION describe-db-instances --query "DBInstances[0].Endpoint.Address" | tr -d '"'`
docker tag newswirehub-ecr:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/newswirehub-ecr:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/newswirehub-ecr:latest

cd ../terraform/
terraform apply --auto-approve

sleep 120s

v=`~/.local/bin/aws ecs list-tasks --cluster "default" --output text --query taskArns[0]`
if  [ $v != "None" ]; then
    ~/.local/bin/aws ecs stop-task --task $v > stop.txt
fi
~/.local/bin/aws ecs run-task --cluster "default" --task-definition newswirehub-task > run.txt