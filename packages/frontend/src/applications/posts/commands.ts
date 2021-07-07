import firebase from 'firebase';
import { ImageMetadata, PostEntity } from './types';

/**
 * 記事用のパス領域に対して、Fileオブジェクトとして通知されたアップロード用画像を登録する。
 *
 * @param app 対象のFirebaseアプリケーション
 * @param post 連携対象の記事データ
 * @param files アップロードするファイル郡
 * @returns アップロードしたファイルのMarkdown用のメタデータ一式
 */
export const uploadImagesForPost = async (
  app: firebase.app.App,
  post: PostEntity,
  files: File[]
): Promise<ImageMetadata[]> => {
  const storage = app.storage();
  return Promise.all(
    files.map(async (f) => {
      const filename = `uploads/${post.id}/${f.name}`;
      const fileRef = storage.ref(filename);
      await fileRef.put(f);
      return {
        alt: f.name,
        title: f.name,
        url: await fileRef.getDownloadURL(),
      };
    })
  );
};
