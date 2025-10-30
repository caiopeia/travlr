# Travlr
* is an app to support travelers
  * friends
  * locations
  * photos
* see [use cases](doc/use_cases.drawio.png)

## Architecture
* see [diagram](doc/architecture-diagram.drawio.png)
* infrastructure:
  * [Architect for AWS Fargate for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
  * [Creating an Amazon ECS Linux task for the Fargate with the AWS CLI](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html)
  * [Learn how to create an Amazon ECS Linux task for Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-fargate.html)
  * ! [Example: Create an AWS Fargate service using the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/ecs-example.html)
  * [Amazon CI/CD pipeline deploying to ECS Fargate using CDK V2](https://github.com/aws-samples/amazon-ecs-fargate-cdk-v2-cicd)
* frontend:
  * ! [react native](https://reactnative.dev/)
  * [flutter](https://flutter.dev/)
  * [ripple](https://www.ripplejs.com/) 

## Backend
* run spring backend service from IDE and open http://localhost:8080/mono in your browser
* to run in container
```
./gradlew :backend:bootBuildImage
```
