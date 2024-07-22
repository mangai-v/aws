
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {Stack, StackProps} from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import path = require('path');
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
interface ApiStackProps extends StackProps {
  getFunctionLambdaIntegration:LambdaIntegration
  postFunctionLambdaIntegration:LambdaIntegration
}
export class AwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: ApiStackProps) {
    super(scope, id, props);
      
      const myLambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
        runtime: lambda.Runtime.NODEJS_LATEST,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'index.handler',
      });
   
      const api = new apigateway.RestApi(this, 'MyApi', {
        restApiName: 'MyService',
        description: 'This service serves my Lambda function.',
      });
   
      const lambdaIntegration = new apigateway.LambdaIntegration(myLambdaFunction);
      api.root.addMethod('GET', lambdaIntegration);
   
      const items = api.root.addResource('items');
      items.addMethod('POST', lambdaIntegration); 
    }
  }

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  