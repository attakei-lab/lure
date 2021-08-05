import { JSDOM } from 'jsdom';
import marked from 'marked';
import { TxtNode, TxtParentNode } from '@textlint/ast-node-types';
import { split, Syntax, StrNode } from 'sentence-splitter';

type TokenMap = Map<string, number>;

/**
 * 検索用トークン生成器
 *
 * n-gramをベースにして、テキストから検索用トークンを生成する
 */
export class SearchTokenizer {
  protected size: number;
  public readonly tokens: TokenMap;

  /**
   * @param size - n-gramの文字列長
   */
  public constructor(size: number) {
    this.size = size;
    this.tokens = new Map<string, number>();
  }

  /**
   * 新しい文を追加する
   *
   * @param source - 対象となる文章（単文）
   */
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

/**
 * 段落を構成する複数の文章を単文のリストにする。
 *
 * @param text - 段落の文章
 * @returns 分割された単文の配列
 */
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

/**
 * Markdownのソースから、文章相当の箇所をピックアップする
 *
 * @param text - 対象となるMarkdownソース
 * @returns 文章（段落）の配列。段落のため、1要素が複数の単文を含むケースがある
 */
export const parseContent = (text: string): string[] => {
  const dom = new JSDOM(`<body>${marked(text)}</body>`);
  const doc = dom.window.document;
  return doc
    .querySelector('body')!
    .textContent!.trim()
    .split(/\n+/)
    .map((v) => v.trim())
    .filter((v) => v !== '');
};
