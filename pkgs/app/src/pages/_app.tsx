import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContainer from '../components/Login';
import { appConfig, firebaseConfig } from '../config';
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

const App: (appProps: AppProps) => any = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <FirebaseAppProvider config={firebaseConfig}>
      <Header />
      <FirebaseAppContext.Consumer>
        {(ctx) =>
          ctx.loading ? (
            <>Loading</>
          ) : ctx.error ? (
            <>{ctx.error}</>
          ) : !ctx.user &&
            !isPublicPage(router.pathname, appConfig.publicPages) ? (
            <LoginContainer next={router.pathname} />
          ) : (
            <Component {...pageProps} />
          )
        }
      </FirebaseAppContext.Consumer>
      <Footer />
    </FirebaseAppProvider>
  );
};

export default App;
