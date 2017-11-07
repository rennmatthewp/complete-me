const Node = require('./Node.js')

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let letters = word.split('');
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.child[letter]) {
        currentNode.child[letter] = new Node(letter);
      }

      currentNode = currentNode.child[letter];
    });
    
    if (!currentNode.wordEnd) {
      this.wordCount++;
      currentNode.wordEnd = true;
    }
  }

  suggest(phrase) {
    phrase = phrase.toLowerCase();
    let currentNode = this.root;
    let letters = phrase.split('');

    letters.forEach(letter => {      
      currentNode = currentNode.child[letter];
    });

    if (!currentNode || !currentNode.child) {
      return [];
    }
    
    return this.findSuggestions(currentNode, letters.join(''));
  }

  findSuggestions(currentNode, phrase, suggestions = []) {
    let childrenLetter = Object.keys(currentNode.child);
    
    childrenLetter.forEach(childLetter => {  
      let letterNode = currentNode.child[childLetter];
      let newPhrase = phrase + childLetter;
      if (letterNode.wordEnd) {
        suggestions.push({
          word: newPhrase,
          frequency: letterNode.frequency
        });
      }

      return this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    suggestions.sort((a, b) => {
      return b.frequency - a.frequency;
    });

    return suggestions.map(wordObj => {
      return wordObj.word;
    });
  }

  populate(dictionary) {

    dictionary.forEach(word => {
      this.insert(word.toLowerCase());
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

module.exports = Trie; 