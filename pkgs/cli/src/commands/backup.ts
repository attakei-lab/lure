import fs from 'fs';
import { formatISO } from 'date-fns';
import firebaseAdmin from 'firebase-admin';
import { Argv } from 'yargs';
import { absolute } from '../helpers';
import { CliArgument } from '../types';

export type Options = {
  bucket?: string;
  prefix: string;
};

export const describe = 'Create backup persistant contents from Firebase';

export const builder = {
  bucket: {
    default: undefined,
  },
  prefix: {
    default: 'firestore-backups',
  },
};

export const handler = async (args: Argv & CliArgument & Options) => {
  const workspace = absolute(args.workspace);
  if (!fs.existsSync(workspace)) {
    console.warn(`Workspace is not exists: ${workspace}`);
    return;
  }
  const ts = new Date();
  const serviceAccountJson = `${workspace}/firebase-adminsdk.json`;
  process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountJson;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serviceAccount = require(serviceAccountJson);

  const bucketName = args.bucket || `${serviceAccount.project_id}.appspot.com`;
  const bucketPath = args.prefix;
  const targetUrl = `gs://${bucketName}/${bucketPath}/${formatISO(ts)}`;
  console.info(`Export backup into ${targetUrl}`);

  const client = new firebaseAdmin.firestore.v1.FirestoreAdminClient();
  await client.exportDocuments({
    name: client.databasePath(serviceAccount.project_id, '(default)'),
    outputUriPrefix: targetUrl,
  });

  console.info('Finished');
  return;
};
