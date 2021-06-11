import React from 'react';
import SimpleMDE from 'react-simplemde-editor';

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
