import firebase from 'firebase';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Entity<T = {}> = T & {
  id: string;
  ref: firebase.firestore.DocumentReference;
};
