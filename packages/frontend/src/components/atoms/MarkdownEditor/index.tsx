import dynamic from 'next/dynamic';
import React from 'react';

// SimpleMDEはサーバーサイドで動作しないため、ダイナミックインポートしている
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type Props = {
  /** フォーム内のソースが編集された際の処理 */
  handleInput: (input: string) => void;
  /** フォーム内に表示させるソース */
  input: string;
};

/** SimpleMDEのオプション（基本的には変動しない想定） */
const mdeOptions = {
  sideBySideFullscreen: false,
  spellChecker: false,
};

/**
 * 受け取ったMarkdownソースをエディター内に表示して、編集状態にする
 *
 * @param Props props
 * @todo コードブロックのサポート（要Prism.js）
 */
export const View: React.FC<Props> = ({ handleInput, input }) => (
  <SimpleMDE onChange={handleInput} options={mdeOptions} value={input} />
);

export default View;
