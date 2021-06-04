import React, { useContext } from 'react';
import getConfig from 'next/config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { FirebaseAppContext } from '../hooks/firebase';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const { publicRuntimeConfig } = getConfig();
  return (
    <>
      <main>
        <p>
          Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
        </p>
        <StyledFirebaseAuth
          uiConfig={publicRuntimeConfig.firebaseUI}
          firebaseAuth={app.auth()}
        />
      </main>
    </>
  );
};
export default Page;
