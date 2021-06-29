import * as path from 'path';
import * as admin from 'firebase-admin';

/**
 * Postデータの更新
 *
 * 更新者と作成者の情報を表示等で使うため、データ構造の更新を行う
 */
export const main = async () => {
  await admin
    .firestore()
    .collection('posts')
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((snapshot) => {
        const data = snapshot.data();
        data.createdAt = data.created;
        data.createdRef = data.authorRef;
        data.updatedAt = data.updated;
        data.updatedRef = data.authorRef;
        data.authorRefs = [data.authorRef];
        return snapshot.ref.set(data);
      });
    })
    .then((procs) => Promise.all(procs));
};

(async () => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
    path.join(process.cwd(), 'firebase-adminsdk.json')
  );
  admin.initializeApp();
  await main();
})();
