import { Construct } from 'constructs';
import {
  aws_ec2 as ec2,
  aws_ecs as ecs,
  aws_rds as rds,
  aws_ecs_patterns as ecs_patterns,
  aws_ecr_assets as ecr_assets,
  aws_elasticloadbalancingv2 as elb_v2,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import * as path from "path";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    console.log(process.env.DOCKER_DEFAULT_PLATFORM);

    const vpc = new ec2.Vpc(this, 'TravlrVpc', {
      maxAzs: 3,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'service',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    const instanceIdentifier = 'postgres-18-1'
    const credentialsSecretName = `/RdsInitExample/rds/creds/${instanceIdentifier}`.toLowerCase()
    const credentials = new rds.DatabaseSecret(this, 'MysqlRdsCredentials', {
      secretName: credentialsSecretName,
      username: 'travlr',
    })
    const dbServer = new rds.DatabaseInstance(this, 'MysqlRdsInstance', {
      vpcSubnets: {
        onePerAz: true,
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED
      },
      credentials: rds.Credentials.fromSecret(credentials),
      vpc: vpc,
      port: 5432,
      databaseName: 'travlr',
      allocatedStorage: 20,
      instanceIdentifier,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_18_1,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      parameters: {
        "rds.force_ssl": "0", // allow client access without ssh
      },
    });
    const bastionHost = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc,
      instanceName: 'travlr-bastion',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
    });
    dbServer.connections.allowFrom(bastionHost, ec2.Port.tcp(5432));

    const cluster = new ecs.Cluster(this, 'TravlrCluster', {
      vpc,
    });
    const assetImageProps: ecs.AssetImageProps = {
      cacheDisabled: false,  // debug
      platform: ecr_assets.Platform.LINUX_AMD64,  // force x86 system architecture as it used per default in AWS
    };
    const image = ecs.ContainerImage.fromAsset(
      path.join(__dirname, '..', '..', 'backend'),
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
        secrets: {
          "DB_HOST": ecs.Secret.fromSecretsManager(credentials, 'host'),
          "DB_PORT": ecs.Secret.fromSecretsManager(credentials, 'port'),
          "DB_NAME": ecs.Secret.fromSecretsManager(credentials, 'dbname'),
          "DB_USER": ecs.Secret.fromSecretsManager(credentials, 'username'),
          "DB_PASSWORD": ecs.Secret.fromSecretsManager(credentials, 'password'),
        },
        containerPort: 80,
      },
      healthCheck: {
        command: [
            "CMD-SHELL",
            "wget --no-verbose --tries=1 --spider http://localhost/actuator/health || exit 1",
            // debug: print to cloudwatch logs of container
            // "wget --no-verbose --tries=1 --spider http://localhost/actuator/health >> /proc/1/fd/1 2>&1 || exit 1",
        ],
        startPeriod: Duration.seconds(30),
        timeout: Duration.seconds(10),
        retries: 2,
      },
    });
    fargate.targetGroup.configureHealthCheck({
      path: "/actuator/health",
      port: "80",
      healthyHttpCodes: "200",
      interval: Duration.seconds(30),
      protocol: elb_v2.Protocol.HTTP,
    })
    credentials.grantRead(fargate.service.taskDefinition.taskRole)
    dbServer.connections.allowFrom(fargate.service, ec2.Port.tcp(5432))
    fargate.cluster.node.addDependency(dbServer)    // cluster shall wait until rds instance up
  }
}
