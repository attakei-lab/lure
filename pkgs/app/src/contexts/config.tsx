import getConfig from 'next/config';
import React, { createContext, useContext, PropsWithChildren } from 'react';
import { AppConfig, defaultOptions } from '../config';

export const AppConfigContext = createContext<AppConfig>({
  firebase: {},
  firebaseUI: {},
  appOptions: defaultOptions,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const AppConfigProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { publicRuntimeConfig } = getConfig();
  const appOptions = publicRuntimeConfig.appOptions || {};
  return (
    <AppConfigContext.Provider
      value={{
        ...publicRuntimeConfig,
        appOptions: { ...appOptions, ...defaultOptions },
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export const useConfig = (): AppConfig => useContext(AppConfigContext);
