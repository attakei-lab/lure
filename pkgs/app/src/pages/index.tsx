import React from 'react';
import { Container } from 'semantic-ui-react';

import Login from '../components/organisms/Login';

export const Page = () => {
  return (
    <>
      <main>
        <Container>
          <p>
            Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
          </p>
          <Login />
        </Container>
      </main>
    </>
  );
};
export default Page;
