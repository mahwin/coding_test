class Node {
  constructor() {
    this.child = {};
    this.value = 0;
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }

  add(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (node.child[char] === undefined) {
        node.child[char] = new Node();
      }
      node = node.child[char];
      node.value++;
    }
  }
}

function solution(words) {
  const trie = new Trie();
  words.forEach((word) => {
    trie.add(word);
  });

  let result = 0;
  for (const word of words) {
    let node = trie.root;
    let flag = false;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      node = node.child[char];
      if (node.value === 1) {
        result += i + 1;
        flag = true;
        break;
      }
    }
    if (!flag) result += word.length;
  }
  return result;
}
