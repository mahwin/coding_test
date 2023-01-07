class Node {
  constructor() {
    this.child = {};
    this.cnt = 0;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
    this.cnt = 0;
  }

  push(string) {
    this.cnt++;
    let currentNode = this.root;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (currentNode.child[char] === undefined) {
        currentNode.child[char] = new Node();
      }
      currentNode.child[char].cnt++;
      currentNode = currentNode.child[char];
    }
  }

  getCntOne(string) {
    let deps = 0;
    let currentNode = this.root;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      deps++;

      if (currentNode.child[char].cnt === 1) return deps;
      currentNode = currentNode.child[char];
    }
    return string.length;
  }
}

function solution(words) {
  const trieTree = new Trie();

  words.forEach((word) => {
    trieTree.push(word);
  });
  let cnt = 0;

  words.forEach((word) => {
    cnt += trieTree.getCntOne(word);
  });

  return cnt;
}

console.log(solution(["word", "war", "warrior", "world"]));
