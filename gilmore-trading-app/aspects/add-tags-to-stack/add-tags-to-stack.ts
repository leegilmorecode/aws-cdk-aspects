import * as cdk from 'aws-cdk-lib';

export type Tags = Record<string, string>;

export function addTagsToStack(stack: cdk.Stack, tags: Tags) {
  Object.entries(tags).forEach((tag) => {
    cdk.Tags.of(stack).add(...tag);
  });
}
