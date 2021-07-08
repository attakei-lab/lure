/**
 * MarkdownViewer内部限定のコンポーネントラッパー集
 *
 * remarkによって生成されるHTMLタグを個別で差し替える用のFC or カスタムコンポーネントをまとめている
 *
 * @todo 用途が限定されすぎているので別Atomにしてないんだけど、いいのだろうか
 */
import styled from 'styled-components';

export const img = styled.img`
  max-width: 100%;
`;

/**
 * react-remarkのrehypeReactOptionsに直接渡すための、コンポーネント対応マップ
 */
export default {
  img,
};
