import * as t from './searchings';

describe('Sentence to tokens', () => {
  it('Simple text', () => {
    const tokenizer = new t.SearchTokenizer(2);
    tokenizer.update('This is a pen');
    expect(tokenizer.tokens.size).toBe(10);
    tokenizer.update('This is a pen');
    expect(tokenizer.tokens.size).toBe(10);
  });

  it('Multiple texts', () => {
    const tokenizer = new t.SearchTokenizer(2);
    tokenizer.update('This is a pen');
    tokenizer.update('That is an apple.');
    expect(tokenizer.tokens.size).toBe(20);
  });
});

describe('parseSentences', () => {
  it('Single sentence', () => {
    const sentences = t.parseSentences('This is a pen.');
    expect(sentences).toHaveLength(1);
    expect(sentences[0]).toBe('This is a pen');
  });
  it('Multiple sentences', () => {
    const sentences = t.parseSentences('This is a pen. That is an apple');
    expect(sentences).toHaveLength(2);
    expect(sentences[0]).toBe('This is a pen');
  });
  it('Multiple lines', () => {
    const sentences = t.parseSentences(`
      This is a pen.
      That is an apple.
    `);
    expect(sentences).toHaveLength(2);
    expect(sentences[0]).toBe('This is a pen');
  });
});
