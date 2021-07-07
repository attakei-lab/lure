import footnotes from '@bytemd/plugin-footnotes';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import React from 'react';
import { UploadImagesHandler } from '@/types';

export type Props = {
  /** フォーム内のソースが編集された際の処理 */
  handleInput: (input: string) => void;
  /** フォーム内に表示させるソース */
  input: string;
  handleImages: UploadImagesHandler;
};

/**
 * 受け取ったMarkdownソースをエディター内に表示して、編集状態にする
 *
 * @param Props props
 * @todo コードブロックのサポート（要Prism.js）
 */
export const View: React.FC<Props> = ({ handleImages, handleInput, input }) => {
  const plugins = [footnotes(), highlight()];
  return (
    <Editor
      onChange={handleInput}
      plugins={plugins}
      value={input}
      uploadImages={handleImages}
    />
  );
};

export default View;
