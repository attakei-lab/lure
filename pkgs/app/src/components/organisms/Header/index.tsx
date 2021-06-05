import React, { useContext } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useConfig } from '../../../contexts/config';
import { FirebaseAppContext } from '../../../contexts/firebase';

export const ContainerComponent = () => {
  const { appOptions } = useConfig();
  const { user } = useContext(FirebaseAppContext);
  return (
    <header>
      <Menu inverted fixed="top" color={appOptions.color}>
        <Container fluid>
          {/* TODO: use other styling */}
          <Menu.Item header style={{ fontWeight: 700, fontSize: '1.5rem' }}>
            Lure
          </Menu.Item>
        </Container>
        <Menu.Item>
          <p>{user ? `Logged in as ${user.displayName}` : 'Need to log in'}</p>
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default ContainerComponent;
