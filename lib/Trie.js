import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  // insert('pizza')
  insert(word) {
    // assign this.root to new Node if it is null
    if (this.root === null) {
      this.root = new Node('');
    }
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
    // increase word count
    if (!currentNode.wordEnd) {
      this.wordCount++;
      currentNode.wordEnd = true;
    }
  }

  suggest(phrase) {
    if (this.root === null) {
      this.root = new Node('');
    }
    let currentNode = this.root;

    let letters = phrase.split(''); // splits word in to array of the letters

    // iterate over letters array
    letters.forEach(letter => {
      // travel to last node
      currentNode = currentNode.child[letter];
    });

    if (!currentNode || !currentNode.child) {
      // if phrase has no matches in array or no children
      return []; // return empty array
    }

    return this.findSuggestions(currentNode, letters.join(''));
  }

  findSuggestions(currentNode, phrase, suggestions = []) {
    let childrenLettter = Object.keys(currentNode.child);

    childrenLettter.forEach(childLetter => {
      let letterNode = currentNode.child[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push({
          word: newPhrase,
          popCount: letterNode.frequency
        });
      }

      this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    suggestions.sort((a, b) => {
      return b.popCount - a.popCount;
    });

    return suggestions.map(wordObj => {
      return wordObj.word;
    });
  }
  
  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  select(word) {
    let currentNode = this.root;

    let letters = word.split('');

    letters.forEach(letter => {
      currentNode = currentNode.child[letter];
    });
    currentNode.frequency++;
  }
}