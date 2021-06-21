import getConfig from 'next/config';
import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Container, Header } from 'semantic-ui-react';
import { FirebaseAppContext } from '@/contexts/firebase';

export type Props = {
  headingText?: string;
  next?: string;
};

export const View: React.FC<Props> = ({ headingText, next }) => {
  const { publicRuntimeConfig } = getConfig();
  const { app } = useContext(FirebaseAppContext);
  const uiConfig = {
    ...publicRuntimeConfig.firebaseUI,
    signInSuccessUrl:
      next || publicRuntimeConfig.firebaseUI.signInSuccessUrl || '/',
  };
  return (
    <Container>
      <Header as="h1">{headingText}</Header>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </Container>
  );
};

export default View;
