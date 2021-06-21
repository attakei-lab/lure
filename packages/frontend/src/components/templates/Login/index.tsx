import React from 'react';
import Login from '@/components/organisms/Login';
import BaseLayout from '@/components/templates/BaseLayout';

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
