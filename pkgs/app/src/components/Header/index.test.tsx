import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import firebase from 'firebase';
import { FirebaseAppContext, FirebaseApp } from '../../hooks/firebase';
import Header from '.';

const renderComponent = (app: FirebaseApp) => {
  return render(
    <FirebaseAppContext.Provider value={app}>
      <Header />
    </FirebaseAppContext.Provider>
  );
};

describe('Header:', () => {
  let renderResult: RenderResult;
  describe('Firebase初期化中', () => {
    beforeEach(() => {
      renderResult = renderComponent({
        loading: true,
        error: null,
        app: null,
        user: null,
      });
    });
    describe('初期状態', () => {
      test('アプリ名が表示されている', async () => {
        await waitFor(() => {
          expect(renderResult.getByText('Lure')).toBeVisible();
        });
      });
    });
  });
  describe('Firebase初期化失敗', () => {
    beforeEach(() => {
      renderResult = renderComponent({
        loading: false,
        error: new Error('an error'),
        app: null,
        user: null,
      });
    });
    describe('初期状態', () => {
      test('アプリ名が表示されている', async () => {
        await waitFor(() => {
          expect(renderResult.getByText('Lure')).toBeVisible();
        });
      });
    });
  });
  describe('非ログイン', () => {
    beforeEach(() => {
      renderResult = renderComponent({
        loading: false,
        error: null,
        app: null,
        user: null,
      });
    });
    describe('初期状態', () => {
      test('アプリ名が表示されている', async () => {
        await waitFor(() => {
          expect(renderResult.getByText('Lure')).toBeVisible();
        });
      });
      test('ログイン導線が存在する', async () => {
        await waitFor(() => {
          expect(renderResult.getByText(/Need to log in/)).toBeVisible();
        });
      });
    });
  });
  describe('ログイン中', () => {
    const user = {
      displayName: 'test user',
    };
    beforeEach(() => {
      renderResult = renderComponent({
        loading: false,
        error: null,
        app: null,
        user: user as firebase.User,
      });
    });
    describe('初期状態', () => {
      test('アプリ名が表示されている', async () => {
        await waitFor(() => {
          expect(renderResult.getByText('Lure')).toBeVisible();
        });
      });
      test('ユーザー名が表示されている', async () => {
        await waitFor(() => {
          expect(
            renderResult.getByText(/Logged in as test user/)
          ).toBeVisible();
        });
      });
    });
  });
  afterEach(() => {
    // テスト終了後処理 テスト対象のアンマウント
    renderResult.unmount();
  });
});