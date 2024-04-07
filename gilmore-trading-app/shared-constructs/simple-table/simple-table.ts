import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import { Construct } from 'constructs';

interface SimpleTableProps
  extends Pick<dynamodb.TableProps, 'removalPolicy' | 'partitionKey'> {
  /**
   * The partition key attribute for the table
   */
  partitionKey: dynamodb.Attribute;
  /**
   * The removal policy for the table
   */
  removalPolicy: cdk.RemovalPolicy;
}

type FixedDynamoDbTableProps = Omit<
  dynamodb.TableProps,
  'removalPolicy' | 'partitionKey'
>;

export class SimpleTable extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: SimpleTableProps) {
    super(scope, id);

    // these are some props we want to fix as an organisation
    const fixedProps: FixedDynamoDbTableProps = {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      contributorInsightsEnabled: true,
    };

    this.table = new dynamodb.Table(this, id + 'Table', {
      // fixed props
      ...fixedProps,
      // custom props
      ...props,
    });
  }
}
