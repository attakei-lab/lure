import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import { firebaseConfig } from '../config';
import { FirebaseAppContext, FirebaseAppProvider } from '../hooks/firebase';

const App: (appProps: AppProps) => any = ({ Component, pageProps }) => {
  return (
    <FirebaseAppProvider config={firebaseConfig}>
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
    </FirebaseAppProvider>
  );
};

export default App;
