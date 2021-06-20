import firebase from 'firebase';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Entity<T = {}> = T & {
  id: string;
  ref: firebase.firestore.DocumentReference;
};

/**
 * Firebaseからのデータ取得などに使用するHooks (useXxxx)のリターン内容
 */
export type HookProcess<T> = T & {
  /** 内部処理時にエラーが起きているなら、undefinedでなくなる */
  error?: Error;
  /** 処理中フラグ（処理の成否に関わらず、終了したらfalseになる） */
  loading: boolean;
};
