import { FirebaseOptions } from '@firebase/app-types';
import firebase from 'firebase';
import React, {
  createContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import 'firebase/firestore';
import { configureUserProfile } from '@/applications/auth/commands';
import { UserProfileEntity } from '@/applications/auth/types';

export type FirebaseApp = {
  loading: boolean;
  error: Error | null;
  app: firebase.app.App | null;
  user: firebase.User | null;
  profile: UserProfileEntity | null;
};

export const FirebaseAppContext = createContext<FirebaseApp>({
  loading: true,
  error: null,
  app: null,
  user: null,
  profile: null,
});

// TODO: Fix type
export const FirebaseAppProvider: FC<
  PropsWithChildren<{ config: FirebaseOptions }>
> = ({ children, config }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>(null);
  const [app, setApp] = useState<firebase.app.App>(null);
  const [user, setUser] = useState<firebase.User>(null);
  const [profile, setProfile] = useState<UserProfileEntity>(null);

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
    app.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
        return;
      }
      const profile = await configureUserProfile(app, user);
      setProfile(profile);
      console.debug(`Log in as "${profile.name}"`);
      setLoading(false);
    });
  }, [app]);

  return (
    <FirebaseAppContext.Provider value={{ loading, error, app, user, profile }}>
      {children}
    </FirebaseAppContext.Provider>
  );
};
