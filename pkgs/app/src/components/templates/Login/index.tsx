import React from 'react';
import BaseLayout from '../BaseLayout';
import Login from '../../organisms/Login';

export type Props = {
  headingText?: string;
  next?: string;
};

export const View: React.FC<Props> = ({ next }) => {
  return (
    <BaseLayout>
      <main>
        <Login headingText="Log in" next={next} />
      </main>
    </BaseLayout>
  );
};
export default View;
