import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { pushPostRevision } from './modules/revisions';
import { notifyPostEvent } from './modules/slack';
import { BackendConfig } from './types';

admin.initializeApp();

export const handleCreatePost = functions.firestore
  .document(`posts/{postId}`)
  .onCreate(async (post, context) => {
    const config = functions.config() as BackendConfig;
    const promises: Promise<any>[] = [];
    promises.push(pushPostRevision(admin.app().firestore(), post));
    if (config.slack) {
      promises.push(notifyPostEvent(post, config, 'created'));
    }
    return Promise.all(promises);
  });

export const handleUpdatePost = functions.firestore
  .document(`posts/{postId}`)
  .onUpdate(async (changed, context) => {
    const config = functions.config() as BackendConfig;
    const promises: Promise<any>[] = [];
    promises.push(pushPostRevision(admin.app().firestore(), changed.after));
    if (config.slack) {
      promises.push(notifyPostEvent(changed.after, config, 'updated'));
    }
    return Promise.all(promises);
  });
