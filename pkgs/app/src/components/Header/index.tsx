import React, { useContext } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { getOptions } from '../../config';
import { FirebaseAppContext } from '../../hooks/firebase';

export const ContainerComponent = () => {
  const { color } = getOptions();
  const { user } = useContext(FirebaseAppContext);
  return (
    <header>
      <Menu inverted fixed="top" color={color}>
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
