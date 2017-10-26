import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0; //incrementer for number of words inserted into tree
  }

  count() {
    return this.wordCount;
  }

  // insert('pizza')
  insert(word) {
    // split letters in parameter word into comma seperated array
    let letters = word.split(''); // [ p, i, z, z, a ]

    // assign currentNode to root node
    let currentNode = this.root;


    // iterate over letters array to turn letters into nodes
    letters.forEach(letter => {
      // if letter does not exist in child object
      if (!currentNode.child[letter]) {
        // create node for letter
        currentNode.child[letter] = new Node(letter);
      }

      // travel to child letter node
      currentNode = currentNode.child[letter];
    });

    // block duplicate word insertions
    if (!currentNode.wordEnd) {
      // if word has not been inserted to Trie
      this.wordCount++; // increment word count
      currentNode.wordEnd = true; // set wordEnd property on final node to true
    }
  }

  suggest(phrase) {
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
