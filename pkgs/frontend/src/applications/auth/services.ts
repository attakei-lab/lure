import firebase from 'firebase';
import { UserProfileEntity } from './types';

export const userProfileConverter = {
  fromFirestore: (
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): UserProfileEntity => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      avatarUrl: data.avatarUrl,
      name: data.name,
      created: data.created,
    };
  },
  toFirestore: (
    userProfile: UserProfileEntity
  ): firebase.firestore.DocumentData => ({
    avatarUrl: userProfile.avatarUrl,
    name: userProfile.name,
    created: userProfile.created,
  }),
};
