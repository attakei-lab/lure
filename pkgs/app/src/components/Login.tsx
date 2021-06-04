import React, { useContext, FC } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebaseUIConfig } from '../config';
import { FirebaseAppContext } from '../hooks/firebase';

export type Props = {
  next?: string;
};

export const Container: FC<Props> = ({ next }) => {
  const { app } = useContext(FirebaseAppContext);
  const uiConfig = {
    ...firebaseUIConfig,
    signInSuccessUrl: next || firebaseUIConfig.signInSuccessUrl || '/',
  };
  return (
    <>
      <main>
        <h1>Log in</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
      </main>
    </>
  );
};
export default Container;
