import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '.';

describe('Footer', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    // 準備処理 テスト対象Componentの描画
    renderResult = render(<Footer />);
  });
  afterEach(() => {
    // テスト終了後処理 テスト対象のアンマウント
    renderResult.unmount();
  });
  describe('初期状態', () => {
    test('クレジット情報が表示されている', async () => {
      await waitFor(() => {
        expect(renderResult.getByRole('contentinfo')).toHaveTextContent(
          /Powered by/
        );
      });
    });
  });
});
