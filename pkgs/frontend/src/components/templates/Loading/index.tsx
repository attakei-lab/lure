import React from 'react';
import { Container } from 'semantic-ui-react';
import BaseLayout from '@/components/templates/BaseLayout';

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
