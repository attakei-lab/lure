import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

export const Styles: { [key: string]: React.CSSProperties } = {
  Segment: {
    paddingTop: '3rem',
    paddingBottom: '2rem',
    borderRadius: 0,
  },
  Link: {
    color: 'white',
    textDecorationLine: 'underline',
  },
};

/**
 * ページ全体のフッターを表示させる
 */
export const View: React.FC = () => (
  <footer>
    <Segment inverted vertical color="grey" style={Styles.Segment}>
      <Container textAlign="right">
        <p>
          {'Powered by '}
          <a
            href="https://github.com/attakei-lab/lure"
            target="_blank"
            rel="noreferrer"
            style={Styles.Link}
          >
            @attakei
          </a>
        </p>
      </Container>
    </Segment>
  </footer>
);

export default View;
