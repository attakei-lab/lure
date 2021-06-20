import Link from 'next/link';
import React, { useContext } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useConfig } from '@/contexts/config';
import { FirebaseAppContext } from '@/contexts/firebase';

/**
 * ページ全体のヘッダー部分（ナビゲーション類）を表示させる
 */
export const View = () => {
  const { appOptions } = useConfig();
  const { profile } = useContext(FirebaseAppContext);
  return (
    <header>
      <Menu inverted fixed="top" color={appOptions.color}>
        <Container fluid>
          <Link href="/" passHref>
            {/* TODO: use other styling */}
            <Menu.Item header style={{ fontWeight: 700, fontSize: '1.5rem' }}>
              Lure
            </Menu.Item>
          </Link>
          {profile && (
            <Link href="/posts" passHref>
              <Menu.Item>
                <p>記事一覧</p>
              </Menu.Item>
            </Link>
          )}
        </Container>
        <Menu.Item>
          <p>{profile ? `Logged in as ${profile.name}` : 'Need to log in'}</p>
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default View;
