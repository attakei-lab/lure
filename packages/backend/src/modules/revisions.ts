import { Firestore } from '@google-cloud/firestore';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

/**
 * 作成・更新されたドキュメント情報を、リビジョンデータとしてサブコレクションに保持させる
 *
 * @param firestore Firestoreコネクション情報
 * @param docRef 保存対象のドキュメント(ref)
 */
export const pushPostRevision = async (
  firestore: Firestore,
  snapshot: DocumentSnapshot
): Promise<void> => {
  // TODO: Entity型あたりを使うことが望ましい
  const data = snapshot.data()!;
  const id = data.updatedAt.toMillis() as number;
  const revRef = firestore.doc(`posts/${snapshot.id}/revisions/${id}`);
  await revRef.set(data);
};
