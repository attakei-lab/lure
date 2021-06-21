import Link from 'next/link';
import React, { useContext } from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';
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
        <Link href="/" passHref>
          {/* TODO: use other styling */}
          <Menu.Item header style={{ fontWeight: 700, fontSize: '1.5rem' }}>
            Lure
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          {profile ? (
            <>
              <Link href="/posts" passHref>
                <Menu.Item>
                  <p>記事一覧</p>
                </Menu.Item>
              </Link>
              <Menu.Item>
                <Link href="/posts/new" passHref>
                  <Button color="violet">
                    <Icon name="plus" />
                    新規作成
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <p>{`Logged in as ${profile.name}`}</p>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              <p>Need to log in</p>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </header>
  );
};

export default View;
