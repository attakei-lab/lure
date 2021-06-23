import React, { CSSProperties, PropsWithChildren } from 'react';
import { Container } from 'semantic-ui-react';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

export type Props = unknown;

const styles: { [key: string]: CSSProperties } = {
  content: {
    flex: 1,
    marginTop: '5rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

export const View: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <Header />
      <Container fluid style={styles.content}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default View;
