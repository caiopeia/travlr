# Backend
## Run
### As Docker Container
```shell
./gradlew clean build
TAG="travlr.backend:latest"
docker build --tag=$TAG .
docker run -it -p 8080:8080 $TAG
```
* open http://localhost:8080/mono in your browser

## Create
* [Working with the AWS CDK in TypeScript](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html)
### AWS Project
```
cdk init --language typescript
```

## Deploy

