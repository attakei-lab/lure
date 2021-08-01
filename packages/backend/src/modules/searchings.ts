import { TxtNode, TxtParentNode } from '@textlint/ast-node-types';
import { split, Syntax, StrNode } from 'sentence-splitter';

type TokenMap = Map<string, number>;

export class SearchTokenizer {
  protected size: number;
  public readonly tokens: TokenMap;

  public constructor(size: number) {
    this.size = size;
    this.tokens = new Map<string, number>();
  }

  public update(source: string) {
    for (let i = 0; i < source.length; i++) {
      if (i + this.size > source.length) {
        break;
      }
      const token = source.substring(i, i + this.size);
      this.tokens.set(token, (this.tokens.get(token) || 0) + 1);
    }
  }
}

export const parseSentences = (text: string): string[] => {
  let sentences: string[] = [];
  const nodes = split(text);
  const func = (node: TxtNode | TxtParentNode): string[] => {
    let values: string[] = [];
    if (node.type === Syntax.Str) {
      values.push((node as StrNode).value);
    }
    if (node.children) {
      node.children.forEach((child: TxtNode) => {
        values = [...values, ...func(child)];
      });
    }
    return values;
  };
  nodes.forEach((node) => {
    sentences = [...sentences, ...func(node)];
  });
  return sentences;
};
