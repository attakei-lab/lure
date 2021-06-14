import { Content } from './types';

/**
 * 記事情報に関する最低限基本的な内容チェックを行う
 *
 * @param content 記事データ
 * @returns 何かを検知した場合は、メッセージとなる文字列。そうでない場合はnull
 */
export const simpleValidate = (content: Content): string | null => {
  if (!content.title) {
    return 'タイトルは必須です';
  }
  if (!content.body) {
    return '本文は必須です';
  }
  return null;
};
