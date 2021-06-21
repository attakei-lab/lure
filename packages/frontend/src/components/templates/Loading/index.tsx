import React, { PropsWithChildren } from 'react';
import { Container } from 'semantic-ui-react';
import BaseLayout from '@/components/templates/BaseLayout';

export const View: React.FC = () => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <p>Loading</p>
        </Container>
      </main>
    </BaseLayout>
  );
};

export type WrapperProps = {
  loading: boolean;
};

/**
 * ローディング中の場合にローディング画面を優先表示数ためのラッパーコンポーネント
 *
 * @param WrapperProps props
 */
export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  children,
  loading,
}) => <>{loading ? <View /> : children}</>;

export default View;
