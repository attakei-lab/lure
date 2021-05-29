import firebase from 'firebase';
import {
  createContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
} from 'react';

export type FirebaseApp = {
  loading: boolean;
  error: Error | null;
  app: firebase.app.App | null;
  user: firebase.User | null;
};

export const FirebaseAppContext = createContext<FirebaseApp>({
  loading: true,
  error: null,
  app: null,
  user: null,
});

// TODO: Fix type
export const FirebaseAppProvider: FC<PropsWithChildren<{ config: any }>> = ({
  children,
  config,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>(null);
  const [app, setApp] = useState<firebase.app.App>(null);
  const [user, setUser] = useState<firebase.User>(null);

  useEffect(() => {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
        setApp(firebase.app());
      }
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, []);

  useEffect(() => {
    if (!app) return;
    console.debug('Initialize application');
    app.auth().onAuthStateChanged((user) => {
      setLoading(false);
      if (user) setUser(user);
    });
  }, [app]);

  return (
    <FirebaseAppContext.Provider value={{ loading, error, app, user }}>
      {children}
    </FirebaseAppContext.Provider>
  );
};
