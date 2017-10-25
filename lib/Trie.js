import { Node 
} from './Node';

export class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
  }

  // insert('pizza')
  insert(word) {
    // turn word into comma seperated array
    let letters = word.split('');
    // [ p, i, z, z, a ]
    // root node
    let currentNode = this.root;  
  
    // turn letters into nodes
    letters.forEach(letter => {
      // if letter does not exist in child object
      if (!currentNode.child[letter]) {
        // create node for letter
        currentNode.child[letter] = new Node(letter);
      }
      // travel to child letter node
      currentNode = currentNode.child[letter];
    });
    currentNode.wordEnd = true;
    // increase word count
    this.count++;
  }
}
