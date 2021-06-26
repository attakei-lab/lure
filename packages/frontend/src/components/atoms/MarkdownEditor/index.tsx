import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { Options } from 'easymde';

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

/**
 * 受け取ったMarkdownソースをエディター内に表示して、編集状態にする
 *
 * @param Props props
 * @todo コードブロックのサポート（要Prism.js）
 */
export const View: React.FC<Props> = ({ handleInput, input }) => {
  const options = useMemo<Options>(() => {
    return {
      sideBySideFullscreen: false,
      spellChecker: false,
    };
  }, [window]);

  return <SimpleMDE onChange={handleInput} options={options} value={input} />;
};

export default View;
