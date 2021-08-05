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

describe('parseContent', () => {
  it('heading', () => {
    const content = '# Help title';
    const result = t.parseContent(content);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe('Help title');
  });
  describe('single paragraph', () => {
    it('single sentence', () => {
      const content = 'This is help text.';
      const result = t.parseContent(content);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('This is help text.');
    });
    it('multiple sentence', () => {
      const content = 'This is a pen. That is an apple.';
      const result = t.parseContent(content);
      expect(result).toHaveLength(1);
    });
  });
  describe('multiple paragraph', () => {
    it('single sentence per paragrap', () => {
      const content = `
        This is a pen.
          
        That is an apple.
      `;
      const result = t.parseContent(content);
      expect(result).toHaveLength(2);
    });
  });
  it('complex content', () => {
    const content = `
# Hello

World is mine.

Paradise lost.

* Harry Potter and the Philosopher's Stone
* Harry Potter and the Chamber of Secrets
* Harry Potter and the Prisoner of Azkaban 
* Harry Potter and the Goblet of Fire
* Harry Potter and the Order of the Phoenix
* Harry Potter and the Half-Blood Prince
* Harry Potter and the Deathly Hallows 
    `.trim();
    const result = t.parseContent(content);
    expect(result).toHaveLength(10);
  });
});
