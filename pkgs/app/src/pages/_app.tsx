import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import getConfig from 'next/config';
import 'semantic-ui-css/semantic.min.css';

import { getOptions } from '../config';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContainer from '../components/Login';
import { FirebaseAppContext, FirebaseAppProvider } from '../hooks/firebase';

const isPublicPage = (path: string, rules: Array<string | RegExp>): boolean => {
  const matchedRule = rules.findIndex((rule) => {
    if (typeof rule == 'string') {
      return rule === path;
    }
    return path.match(rule) !== null;
  });
  return matchedRule >= 0;
};

const App: (appProps: AppProps) => React.ReactElement = ({
  Component,
  pageProps,
}) => {
  const appOptions = getOptions();
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  // TODO: use other styling
  return (
    <FirebaseAppProvider config={publicRuntimeConfig.firebase}>
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header />
        <div style={{ marginTop: '5rem', paddingBottom: '2rem', flex: 1 }}>
          <FirebaseAppContext.Consumer>
            {(ctx) =>
              router.pathname === '/404' ? (
                <Component {...pageProps} />
              ) : ctx.loading ? (
                <>Loading</>
              ) : ctx.error ? (
                <>{ctx.error}</>
              ) : !ctx.user &&
                !isPublicPage(router.pathname, appOptions.publicPages) ? (
                <LoginContainer next={router.pathname} />
              ) : (
                <Component {...pageProps} />
              )
            }
          </FirebaseAppContext.Consumer>
        </div>
        <Footer />
      </div>
    </FirebaseAppProvider>
  );
};

export default App;
