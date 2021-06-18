import React, { PropsWithChildren } from 'react';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

export type Props = unknown;

export const View: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <div style={{ marginTop: '5rem', paddingBottom: '2rem', flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default View;
