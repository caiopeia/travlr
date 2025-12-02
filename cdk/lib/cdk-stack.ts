import { Construct } from 'constructs';
import {
  aws_ec2 as ec2,
  aws_ecs as ecs,
  aws_ecs_patterns as ecs_patterns,
  aws_ecr_assets as ecr_assets,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import * as path from "path";
import {Protocol} from "aws-cdk-lib/aws-elasticloadbalancingv2";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    console.log(process.env.DOCKER_DEFAULT_PLATFORM);

    const vpc = new ec2.Vpc(this, 'TravlrVpc', {
      maxAzs: 3,
    });

    const cluster = new ecs.Cluster(this, 'TravlrCluster', {
      vpc: vpc
    });

    const assetImageProps: ecs.AssetImageProps = {
      //cacheDisabled: true,
      platform: ecr_assets.Platform.LINUX_AMD64,  // force x86 system architecture
    };
    const image = ecs.ContainerImage.fromAsset(
      path.join(__dirname, '../../backend/'),
      assetImageProps,
    )

    const fargate = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'TravlrFargateService', {
      cluster: cluster,
      cpu: 512,
      memoryLimitMiB: 2048,
      desiredCount: 1,
      taskImageOptions: {
        image: image,
        environment: {
          "name": "Travlr is now with Spring Boot on Fargate",
        },
      },
//       healthCheck: {
//         // fixme replace by http://localhost:8080/actuator/health if possible in reactive env
//         command: [ "CMD-SHELL", "curl -f http://localhost:8080/mono || exit 1" ],
//         startPeriod: Duration.seconds(10),
//       },
    });
    /*
    fargate.targetGroup.configureHealthCheck({
      path: "/mono",
      port: "8080",
      healthyHttpCodes: "200",
      interval: Duration.seconds(30),
      protocol: Protocol.HTTP,
    })
    */
  }
}
