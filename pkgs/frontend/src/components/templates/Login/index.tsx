import React from 'react';
import Login from '../../organisms/Login';
import BaseLayout from '../BaseLayout';

export type Props = {
  headingText?: string;
  next?: string;
};

export const View: React.FC<Props> = ({ headingText, next }) => {
  return (
    <BaseLayout>
      <main>
        <Login headingText={headingText} next={next} />
      </main>
    </BaseLayout>
  );
};
export default View;
