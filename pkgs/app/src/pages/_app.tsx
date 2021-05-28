import { AppProps } from 'next/app';
import 'react';

import { firebaseConfig } from '../config';
import { FirebaseAppContext, FirebaseAppProvider } from '../hooks/firebase';

const App: (appProps: AppProps) => any = ({ Component, pageProps }) => {
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
