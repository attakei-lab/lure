import { useContext } from 'react';
import { FirebaseAppContext } from '../hooks/firebase';

export const Container = () => {
  const { user } = useContext(FirebaseAppContext);
  return (
    <header>
      <h1>Lure</h1>
      <p>{user ? `Logged in as ${user.displayName}` : 'Need to log in'}</p>
    </header>
  );
};

export default Container;
