import { expect } from 'chai';
import Node from '../lib/Node';

let node;

describe('Node', () => {
  beforeEach(() => {
    node = new Node();
  });

  it('should be a function', () => {
    expect(Node).to.be.a('function');
  });

  it('should have a letter property of null by default', () => {
    expect(node.letter).to.equal(null);
  });

  it('should have an empty object as a child property by default', () => {
    expect(node.child).to.deep.equal({});
  });

  it('should have a wordEnd propery of false by default', () => {
    expect(node.wordEnd).to.equal(false);
  });

  it('should have a frequency propery of 0 by default', () => {
    expect(node.frequency).to.equal(0);
  });

  it('should take a letter as a parameter and assign it to a node', () => {
    let node = new Node('z');

    expect(node.letter).to.equal('z');
  });
});
