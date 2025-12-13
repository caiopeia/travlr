# Travlr CDK TypeScript project

## Deploy
```shell
./gradlew :backend:clean :backend:build
cd cdk
npm i
npm run cdk deploy
```
* build the jar and deploy
* after the deployment has finished successfully you can test the running instance from your browser
  * therefore see the cdk output for `CdkStack.TravlrFargateServiceServiceURL`
    * example: http://cdksta-travl-swubwmi3u5ij-100857690.eu-west-1.elb.amazonaws.com/api/trips
  * open it inside your browser and reference for example the actuator health endpoint
    * http://CdkSta-Travl-Ho9sG87J6vNo-1906300597.eu-west-1.elb.amazonaws.com/actuator/health
* if you never used CDK before you ll get an error which can be fixed by
```shell
npm run cdk bootstrap
```

## Destroy
```shell
npm run cdk destroy
```

## Connect to Remote Database (AWS RDS) 
* after running the provided cdk stack and deploying the database and bastion host find in AWS console:
  * BASTION_EC2_INSTANCE_ID (ec2 instances)
  * RDS_HOST (rds secrets)
```shell
BASTION_EC2_INSTANCE_ID="i-085fbbc4259521e6d"
RDS_HOST="postgres-18-1.ct4mwyswge0y.eu-west-1.rds.amazonaws.com"
aws ssm start-session \
  --region eu-west-1 \
  --target $BASTION_EC2_INSTANCE_ID \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters '{"host":["'"$RDS_HOST"'"],"portNumber":["5432"],"localPortNumber":["5433"]}'
```
* then use any database client with host `localhost` and port `5433`
  * for database name, user and password see rds secrets in AWS

## Further Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Init AWS Project
* [Working with the AWS CDK in TypeScript](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html)
```
npm run cdk init --language typescript
```
