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
  getCnt(string) {
    if (string === "") return this.cnt;

    let currentNode = this.root;

    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (currentNode.child[char] === undefined) return 0;
      currentNode = currentNode.child[char];
    }
    return currentNode.cnt;
  }
}

function solution(words, queries) {
  let foreTrieObj = {};
  let backTrieObj = {};
  words.forEach((word) => {
    let key = word.length;
    if (foreTrieObj[key]) {
      foreTrieObj[key].push(word);
    } else {
      const trie = new Trie();
      trie.push(word);
      foreTrieObj[key] = trie;
    }

    let reverseWord = word.split("").reverse().join("");
    if (backTrieObj[key]) {
      backTrieObj[key].push(reverseWord);
    } else {
      const trie = new Trie();
      trie.push(reverseWord);
      backTrieObj[key] = trie;
    }
  });
  let answer = [];
  let reg = /[^?]+/;
  queries.forEach((query) => {
    let key = query.length + "";
    let isBack = query[0] !== "?" ? false : true;
    query = query.match(reg);
    query = !query ? "" : query[0];
    if (Object.keys(foreTrieObj).includes(key)) {
      if (isBack) {
        // back
        let reverseWord = query.split("").reverse().join("");

        answer.push(backTrieObj[key].getCnt(reverseWord));
      } else {
        // fore
        let word = query;
        answer.push(foreTrieObj[key].getCnt(word));
      }
    } else {
      answer.push(0);
    }
  });
  return answer;
}

console.log(
  solution(
    ["frodo", "front", "frost", "frozen", "frame", "kakao"],
    ["fro??", "????o", "fr???", "fro???", "pro?", "?????"]
  )
);
