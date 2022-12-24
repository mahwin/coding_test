class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  push(string) {
    let currentNode = this.root;

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];

      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new Node(
          currentNode.value + currentChar
        );
      }
      currentNode = currentNode.child[currentChar];
    }
    currentNode.end = true;
  }

  is_exist(string) {
    let currentNode = this.root;

    for (let i = 0; i < string.length; i++) {
      let currentChar = string[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return false;
      }
    }
    return true;
  }
}
