class Node {
  constructor() {
    this.child = {};
    this.lengthObj = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(str) {
    const length = str.length;
    let current = this.root;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (current.child[char] === undefined) {
        current.child[char] = new Node();
      }
      if (current.lengthObj[length] === undefined) {
        current.lengthObj[length] = 1;
      } else current.lengthObj[length]++;

      current = current.child[char];
    }
  }
  search(str) {
    const length = str.length;
    let current = this.root;
    for (let i = 0; i < length; i++) {
      const char = str[i];

      if (char === "?") {
        return current.lengthObj[length] || 0;
      }

      if (current.child[char] === undefined) {
        return 0;
      }
      current = current.child[char];
    }
    return current.lengthObj[length] || 0;
  }
}

function solution(words, queries) {
  const result = [];

  const trie = new Trie();
  const backTrie = new Trie();

  words.forEach((word) => {
    trie.add(word);
    backTrie.add(word.split("").reverse().join(""));
  });

  for (let query of queries) {
    if (query[0] === "?") {
      query = query.split("").reverse().join("");
      result.push(backTrie.search(query));
    } else {
      result.push(trie.search(query));
    }
  }

  return result;
}
