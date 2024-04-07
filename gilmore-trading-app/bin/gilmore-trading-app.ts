#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { GilmoreTradingAppStatefulStack } from '../stateful/stateful';

const app = new cdk.App();
new GilmoreTradingAppStatefulStack(app, 'GilmoreTradingAppStatefulStack', {});
