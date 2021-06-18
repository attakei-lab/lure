import React from 'react';
import { Container } from 'semantic-ui-react';
import BaseLayout from '@/components/templates/BaseLayout';

type Props = {
  error: Error;
};

export const View: React.FC<Props> = ({ error }) => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <p>{error.message}</p>
        </Container>
      </main>
    </BaseLayout>
  );
};

export default View;
