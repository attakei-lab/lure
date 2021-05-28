import 'react';
import { FirebaseProvider } from 'firebase-react-provider';
import { AppProps } from 'next/app';

import { firebaseConfig } from '../config';

const App: (appProps: AppProps) => any = ({ Component, pageProps }) => (
  <FirebaseProvider config={firebaseConfig}>
    <Component {...pageProps} />
  </FirebaseProvider>
);

export default App;
