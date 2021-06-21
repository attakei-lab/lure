import fs from 'fs';
import { Argv } from 'yargs';
import { absolute } from '../helpers';
import { CliArgument } from '../types';

export const handler = (args: Argv & CliArgument) => {
  const workspace = absolute(args.workspace);
  if (fs.existsSync(workspace)) {
    console.warn(`Workspace is already exists: ${workspace}`);
    return;
  }
  fs.mkdirSync(workspace);
  console.info(`Create workspace: ${workspace}`);
};
