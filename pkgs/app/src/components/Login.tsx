import React, { useContext, FC } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import getConfig from 'next/config';

import { FirebaseAppContext } from '../hooks/firebase';

export type Props = {
  next?: string;
};

export const Container: FC<Props> = ({ next }) => {
  const { publicRuntimeConfig } = getConfig();
  const { app } = useContext(FirebaseAppContext);
  const uiConfig = {
    ...publicRuntimeConfig.firebaseUI,
    signInSuccessUrl:
      next || publicRuntimeConfig.firebaseUI.signInSuccessUrl || '/',
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
