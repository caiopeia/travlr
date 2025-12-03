# Travlr CDK TypeScript project

## Deploy
* build the jar and deploy
```shell
./gradlew :backend:clean :backend:build
cd cdk
npm i
npm run cdk deploy
```
* if you never used CDK before you ll get an error which can be fixed by
```shell
npm run cdk bootstrap
```

## Destroy
```shell
npm run cdk destroy
```

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
