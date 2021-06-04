import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebaseUIConfig } from '../config';
import { FirebaseAppContext } from '../hooks/firebase';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  return (
    <>
      <main>
        <p>
          Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
        </p>
        <StyledFirebaseAuth
          uiConfig={firebaseUIConfig}
          firebaseAuth={app.auth()}
        />
      </main>
    </>
  );
};
export default Page;
