import dynamic from 'next/dynamic';
import React from 'react';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type Props = {
  handleInput: (input: string) => void;
  input: string;
};

const mdeOptions = {
  sideBySideFullscreen: false,
  spellChecker: false,
};

export const View: React.FC<Props> = ({ handleInput, input }) => (
  <>
    <SimpleMDE onChange={handleInput} options={mdeOptions} value={input} />
  </>
);

export default View;
