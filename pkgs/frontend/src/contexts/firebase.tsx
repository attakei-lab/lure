import { FirebaseOptions } from '@firebase/app-types';
import { DocumentReference } from '@firebase/firestore-types';
import firebase from 'firebase';
import React, {
  createContext,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import 'firebase/firestore';
import { configureUserProfile } from '../services/auth/commands';
import { UserProfile } from '../services/auth/types';

export type FirebaseApp = {
  loading: boolean;
  error: Error | null;
  app: firebase.app.App | null;
  user: firebase.User | null;
  profile: UserProfile | null;
  profileRef: DocumentReference | null;
};

export const FirebaseAppContext = createContext<FirebaseApp>({
  loading: true,
  error: null,
  app: null,
  user: null,
  profile: null,
  profileRef: null,
});

// TODO: Fix type
export const FirebaseAppProvider: FC<
  PropsWithChildren<{ config: FirebaseOptions }>
> = ({ children, config }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>(null);
  const [app, setApp] = useState<firebase.app.App>(null);
  const [user, setUser] = useState<firebase.User>(null);
  const [profile, setProfile] = useState<UserProfile>(null);
  const [profileRef, setProfileRef] = useState<DocumentReference>(null);

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
      setLoading(false);
      if (!user) setUser(null);
      const [profileData, profileRef] = await configureUserProfile(app, user);
      setProfile(profileData);
      setProfileRef(profileRef);
      console.debug(`Log in as "${profile.name}"`);
    });
  }, [app]);

  return (
    <FirebaseAppContext.Provider
      value={{ loading, error, app, user, profile, profileRef }}
    >
      {children}
    </FirebaseAppContext.Provider>
  );
};
