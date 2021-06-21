import React from 'react';
import Login from '@/components/organisms/Login';
import BaseLayout from '@/components/templates/BaseLayout';
import { Container } from 'semantic-ui-react';

export const Page = () => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <p>
            Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
          </p>
          <Login />
        </Container>
      </main>
    </BaseLayout>
  );
};
export default Page;
