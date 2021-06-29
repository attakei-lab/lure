import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { pushPostRevision } from './modules/revisions';

admin.initializeApp();

export const handleCreatePost = functions.firestore
  .document(`posts/{postId}`)
  .onCreate(async (post, context) => {
    await pushPostRevision(admin.app().firestore(), post);
  });

export const handleUpdatePost = functions.firestore
  .document(`posts/{postId}`)
  .onUpdate(async (changed, context) => {
    await pushPostRevision(admin.app().firestore(), changed.after);
  });
