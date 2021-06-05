import React from 'react';
import BaseLayout from '../BaseLayout';
import { Container } from 'semantic-ui-react';

export const View: React.FC = () => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <p>Loading</p>
        </Container>
      </main>
    </BaseLayout>
  );
};

export default View;
