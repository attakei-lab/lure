import firebase from 'firebase';
import { userProfileConverter } from './services';
import { UserProfileEntity } from './types';

export const fetchUserProfile = async (
  app: firebase.app.App,
  uid: string
): Promise<
  [UserProfileEntity | null, firebase.firestore.DocumentReference]
> => {
  const ref = app
    .firestore()
    .collection('users')
    .withConverter(userProfileConverter)
    .doc(uid);
  const snapshot = await ref.get();
  return snapshot.exists ? [snapshot.data(), ref] : [null, ref];
};
