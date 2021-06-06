#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .help()
  .commandDir('./commands')
  .option('workspace', {
    alias: 'w',
    type: 'string',
    description: 'Workspace for application project',
    default: process.cwd(),
  }).argv;
