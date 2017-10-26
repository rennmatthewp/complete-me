import { expect } from 'chai';
import Trie from '../lib/Trie';
import fs from 'fs'

const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');
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
      expect(
        completion.root.child.p.child.i.child.z.child.z.child.a.wordEnd
      ).to.equal(true);
    });

    it('should increment the wordCount when a new word is inserted', () => {
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

  describe('suggest', () => {
    it('should be a method', () => {
      expect(completion.suggest).to.be.a('function');
    });

    it('should return an array', () => {
      expect(completion.suggest('')).to.deep.equal([]);
    });

    it('should suggest a word that has been inserted', () => {
      completion.insert('pizza');
      expect(completion.suggest('pi')).to.deep.equal(['pizza']);
    });

    it('should suggest words that have been inserted', () => {
      completion.insert('pizza');
      completion.insert('pizzeria');
      completion.insert('pizzle');

      expect(completion.suggest('pi')).to.deep.equal([
        'pizza',
        'pizzeria',
        'pizzle'
      ]);
    });
  });

  describe('populate', () => {
    it('should be a method', () => {
      expect(completion.populate).to.be.a('function');
    });

    it('should populate a dictionary', () => {
      completion.populate(dictionary);
      expect(completion.wordCount).to.equal(235886);
    });
  });
});
