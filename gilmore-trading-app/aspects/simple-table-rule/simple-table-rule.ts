import { Annotations, IAspect } from 'aws-cdk-lib';

import { IConstruct } from 'constructs';
import { SimpleTable } from '../../shared-constructs/simple-table';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export class SimpleTableRule implements IAspect {
  constructor() {}

  // ensure that we don't use the DynamoDB Table construct directly, so if we find one on the tree
  public visit(node: IConstruct): void {
    if (node instanceof Table) {
      // ensure that the Table is a child of a SimpleTable construct, or throw error
      if (!(node.node.scope instanceof SimpleTable)) {
        Annotations.of(node).addError(
          'Table used directly. Please use SimpleTable construct.'
        );
      }
    }
  }
}
