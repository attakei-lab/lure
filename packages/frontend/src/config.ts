import { FirebaseOptions } from '@firebase/app-types';
import firebaseui from 'firebaseui';
import getConfig from 'next/config';
import { SemanticCOLORS } from 'semantic-ui-react';

export type AppOptions = {
  color?: SemanticCOLORS;
  publicPages?: string[];
};

export type AppSettings = {
  firebase: FirebaseOptions;
  firebaseUI: firebaseui.auth.Config;
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

export type AppConfig = AppSettings & {
  appOptions?: AppOptions;
};
