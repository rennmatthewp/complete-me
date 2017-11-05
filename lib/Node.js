class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.child = {};
    this.wordEnd = false;
    this.frequency = 0;
  }
}

module.exports = Node;