import React from 'react';
import BaseLayout from '../BaseLayout';
import { Container } from 'semantic-ui-react';

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
