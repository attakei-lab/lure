import { useContext } from 'react';

import { FirebaseAppContext } from '../hooks/firebase';

export const Page = () => {
  const { user } = useContext(FirebaseAppContext);

  return (
    <>
      <main>
        <p>{user && `Sign in as ${user.displayName}`}</p>
      </main>
    </>
  );
};
export default Page;
