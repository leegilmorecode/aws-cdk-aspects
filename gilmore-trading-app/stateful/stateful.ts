import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import {
  RequiredTagsChecker,
  SimpleTableRule,
  Tags,
  addTagsToStack,
} from '../aspects';

import { Construct } from 'constructs';
import { SimpleTable } from '../shared-constructs/simple-table';
import { requiredTags } from '../config';

export class GilmoreTradingAppStatefulStack extends cdk.Stack {
  public table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // we add the relevant tags for the stack
    const tags: Tags = {
      'gilmore-trading:operations:StackId': 'Stateful',
      'gilmore-trading:operations:ServiceId': 'TradingPlatform',
      'gilmore-trading:operations:ApplicationId': 'Api',
      'gilmore-trading:cost-allocation:Owner': 'Lee',
      'gilmore-trading:cost-allocation:ApplicationId': 'Api',
    };

    // create our simple table to use with the solution which is an l3 constuct
    // with our pre-approved organisational fixed properties
    this.table = new SimpleTable(this, 'Table', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    }).table;

    // add the tags to all constructs in the stack automatically
    // Note: comment out the line below to see the synth fail due to our
    // required tags checker aspect
    addTagsToStack(this, tags);

    // Note: uncomment the lines below to see the synth fail
    // if we use a dynamodb table construct directly due to our SimpleTableRule

    // new dynamodb.Table(this, 'DontUseThisTable', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   partitionKey: {
    //     name: 'id',
    //     type: dynamodb.AttributeType.STRING,
    //   },
    // });

    // for compliance ensure we have the required tags on all constructs or fail synth
    cdk.Aspects.of(this).add(new RequiredTagsChecker(requiredTags));

    // ensure that we only use our SimpleTable and not DynamoDB Table directly for compliance or fail synth
    cdk.Aspects.of(this).add(new SimpleTableRule());
  }
}
