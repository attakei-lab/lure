import footnotes from '@bytemd/plugin-footnotes';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import React from 'react';

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
export const View: React.FC<Props> = ({ handleInput, input }) => {
  const plugins = [footnotes(), highlight()];
  return <Editor onChange={handleInput} plugins={plugins} value={input} />;
};

export default View;
