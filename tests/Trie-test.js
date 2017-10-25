import { expect } from 'chai';
import { Trie } from '../lib/Trie';
let completion;

describe('Trie', () => {
  beforeEach(() => {
    completion = new Trie();
  });

  it('should instantiate a Trie', () => {
    expect(completion).to.be.an('object');
  });

  it('should have a root node defaulted to null', () => {
    expect(completion.root).to.equal(null);
  });

  it('should have a method to insert words', () => {
    expect(completion.insert).to.be.a('function');
  });

  describe('insert', () => {
    it('should be able to take in a word', () => {
      completion.insert('pizza');
      expect(completion.root.child
            .p.child
            .i.child
            .z.child
            .z.child
            .a.wordEnd).to.equal(true);
    });

    it ('should increment the wordCount when a new word is inserted', () => {
      expect(completion.wordCount).to.equal(0);
      completion.insert('pizza');
      expect(completion.wordCount).to.equal(1);      
    });

    it('should not insert the same word twice', () => {
      completion.insert('pizza');
      expect(completion.wordCount).to.equal(1);
      completion.insert('pizza');
      expect(completion.wordCount).to.equal(1);
    });

    
  });
});
