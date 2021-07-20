import React, { PropsWithChildren } from 'react';
import { Container } from 'semantic-ui-react';
import BaseLayout from '@/components/templates/BaseLayout';

type Props = {
  error?: Error;
};

export const View: React.FC<Props> = ({ error }) => {
  console.log(error);
  return (
    <BaseLayout>
      <main>
        <Container>
          <p>{error.message}</p>
        </Container>
      </main>
    </BaseLayout>
  );
};

/**
 * 主にPages段階でErrorをキャッチした際に、表示させるためのラッパーコンポーネント
 *
 * @param Props props
 */
export const Wrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  error,
}) => <>{error ? <View error={error} /> : children}</>;

export default View;
