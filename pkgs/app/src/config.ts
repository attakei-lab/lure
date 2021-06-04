import { FirebaseOptions } from '@firebase/app-types';
import getConfig from 'next/config';
import firebaseui from 'firebaseui';
import { SemanticCOLORS } from 'semantic-ui-react';

export type AppOptions = {
  color?: SemanticCOLORS;
  publicPages?: string[];
};

export type AppSettings = {
  firebase: FirebaseOptions;
  firebaseUI: firebaseui.auth.Config;
  appOptions?: AppOptions;
};

export const defaultOptions: AppOptions = {
  color: 'brown',
  publicPages: [],
};

export const getOptions = (): AppOptions => {
  const { publicRuntimeConfig } = getConfig();
  const appOptions = publicRuntimeConfig.appOptions || {};
  return { ...defaultOptions, ...appOptions };
};

export type AppConfig = AppSettings & AppOptions;
