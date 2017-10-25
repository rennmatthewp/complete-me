import { expect } from 'chai';
import { Trie } from '../lib/Trie';

describe('Trie', () => {
  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  });

  it('should instantiate a Trie', () => {
    let completion = new Trie();
    expect(completion).to.be.an('object');
  });
});