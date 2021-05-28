import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useFirebaseAuth } from 'firebase-react-provider';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebaseUIConfig } from '../config';

export const Page = () => {
  const { appAuth, authConstructor } = useFirebaseAuth();
  const [inProcess, setInProcess] = useState(true);

  useEffect(() => {
    const onWaiting = !(appAuth && authConstructor);
    if (onWaiting) return;
    setInProcess(false);
  }, [appAuth, authConstructor]);

  return (
    <>
      <header>
        <h1>Lure</h1>
      </header>
      {inProcess ? (
        <main>
          <p>ロード中</p>
        </main>
      ) : (
        <main>
          <p>
            Lureは、小〜中規模組織向けのシンプルなドキュメント共有アプリケーションキットです。
          </p>
          <StyledFirebaseAuth
            uiConfig={firebaseUIConfig}
            firebaseAuth={appAuth}
          />
        </main>
      )}
      <footer>
        <p>Powered by @attakei</p>
      </footer>
    </>
  );
};
export default Page;
