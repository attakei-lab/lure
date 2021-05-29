import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'react';

import LoginContainer from '../components/Login';
import { firebaseConfig } from '../config';
import { FirebaseAppContext, FirebaseAppProvider } from '../hooks/firebase';

const App: (appProps: AppProps) => any = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <FirebaseAppProvider config={firebaseConfig}>
      <header>
        <h1>Lure</h1>
      </header>
      <FirebaseAppContext.Consumer>
        {(ctx) =>
          ctx.loading ? (
            <>Loading</>
          ) : ctx.error ? (
            <>{ctx.error}</>
          ) : !ctx.user ? (
            <LoginContainer next={router.pathname} />
          ) : (
            <Component {...pageProps} />
          )
        }
      </FirebaseAppContext.Consumer>
      <footer>
        <p>Powered by @attakei</p>
      </footer>
    </FirebaseAppProvider>
  );
};

export default App;
