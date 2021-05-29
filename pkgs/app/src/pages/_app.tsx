import 'react';
import 'semantic-ui-css/semantic.min.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Container } from 'semantic-ui-react';

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
  // TODO: use other styling
  return (
    <FirebaseAppProvider config={firebaseConfig}>
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Header />
        <div style={{ marginTop: '5rem', paddingBottom: '2rem', flex: 1 }}>
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
        </div>
        <Footer />
      </div>
    </FirebaseAppProvider>
  );
};

export default App;
