import { useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebaseUIConfig } from '../config';
import { FirebaseAppContext } from '../hooks/firebase';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  return (
    <>
      <header>
        <h1>Lure</h1>
      </header>
      <main>
        <p>
          Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
        </p>
        <StyledFirebaseAuth
          uiConfig={firebaseUIConfig}
          firebaseAuth={app.auth()}
        />
      </main>
      <footer>
        <p>Powered by @attakei</p>
      </footer>
    </>
  );
};
export default Page;
