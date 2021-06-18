import 'easymde/dist/easymde.min.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import ErrorTemplate from '@/components/templates/Error';
import LoadingTemplate from '@/components/templates/Loading';
import LoginTemplate from '@/components/templates/Login';
import { AppConfigContext, AppConfigProvider } from '@/contexts/config';
import { FirebaseAppContext, FirebaseAppProvider } from '@/contexts/firebase';

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
  const router = useRouter();
  return (
    <AppConfigProvider>
      <AppConfigContext.Consumer>
        {({ firebase, appOptions }) => (
          <FirebaseAppProvider config={firebase}>
            <FirebaseAppContext.Consumer>
              {(ctx) =>
                router.pathname === '/404' ? (
                  <Component {...pageProps} />
                ) : ctx.loading ? (
                  <LoadingTemplate />
                ) : ctx.error ? (
                  <ErrorTemplate error={ctx.error} />
                ) : !ctx.profile &&
                  !isPublicPage(router.pathname, appOptions.publicPages) ? (
                  <LoginTemplate next={router.pathname} />
                ) : (
                  <Component {...pageProps} />
                )
              }
            </FirebaseAppContext.Consumer>
          </FirebaseAppProvider>
        )}
      </AppConfigContext.Consumer>
    </AppConfigProvider>
  );
};

export default App;
