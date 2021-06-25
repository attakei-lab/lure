import React from 'react';
import { Editor } from '@bytemd/react';

export type Props = {
  /** フォーム内のソースが編集された際の処理 */
  handleInput: (input: string) => void;
  /** フォーム内に表示させるソース */
  input: string;
};

/**
 * 受け取ったMarkdownソースをエディター内に表示して、編集状態にする
 *
 * @param Props props
 * @todo コードブロックのサポート（要Prism.js）
 */
export const View: React.FC<Props> = ({ handleInput, input }) => (
  <Editor onChange={handleInput} value={input} />
);

export default View;
