/**
 * データストア上に管理するユーザー情報
 *
 * - 認証用ではなく、主に表示用
 * - 一部項目は、本人による編集が可
 */
export type UserProfile = {
  /** アイコンなどに使う画像URL */
  avatarUrl: string;
  created: Date;
  /** 表示用の名前 */
  name: string;
};
