import Link from 'next/link';
import React from 'react';
import { Container, Header, Label } from 'semantic-ui-react';

export type Props = {
  /** タグ情報 */
  tags: string[];
};

/**
 * ヘッダーと併せて、それぞれのタグをラベルとして表示させる
 *
 * @param Props props
 */
export const View: React.FC<Props> = ({ tags }) => (
  <Container>
    <Header as="h3" dividing>
      Tags
    </Header>
    {tags.map((tag) => (
      <Link href={`/tags/${tag}`} key={tag} passHref>
        <Label color="teal">{tag}</Label>
      </Link>
    ))}
  </Container>
);

export default View;
