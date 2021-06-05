import React from 'react';

import Login from './organisms/Login';

export type Props = {
  next?: string;
};

export const View: React.FC<Props> = ({ next }) => {
  return (
    <>
      <main>
        <Login headingText="Log in" next={next} />
      </main>
    </>
  );
};
export default View;
