import React, { useContext } from 'react';
import BaseLayout from '@/components/templates/BaseLayout';
import { FirebaseAppContext } from '@/contexts/firebase';

export const Page = () => {
  const { user } = useContext(FirebaseAppContext);

  return (
    <BaseLayout>
      <main>
        <p>{user && `Sign in as ${user.displayName}`}</p>
      </main>
    </BaseLayout>
  );
};
export default Page;
