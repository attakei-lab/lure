import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

/**
 * ページ全体のフッターを表示させる
 */
export const View = () => (
  <footer>
    {/* TODO: use other styling */}
    <Segment
      inverted
      vertical
      color="grey"
      style={{ paddingTop: '3rem', paddingBottom: '2rem', borderRadius: 0 }}
    >
      <Container>
        <p>Powered by @attakei</p>
      </Container>
    </Segment>
  </footer>
);

export default View;
