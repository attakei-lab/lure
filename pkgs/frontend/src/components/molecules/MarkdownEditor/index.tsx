import dynamic from 'next/dynamic';
import React from 'react';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type Props = {
  handleInput: (input: string) => void;
  input: string;
};

export const View: React.FC<Props> = ({ handleInput, input }) => (
  <>
    <SimpleMDE
      onChange={(input) => handleInput(input)}
      options={{
        sideBySideFullscreen: false,
        spellChecker: false,
      }}
      value={input}
    />
  </>
);

export default View;
