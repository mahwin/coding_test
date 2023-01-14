class Node {
  constructor(value = "") {
    this.cnt = 0;
    this.child = {};
    this.value = value;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  push(value) {
    let node = this.root;

    for (let i = 0; i < value.length; i++) {
      let char = value[i];
      if (node.child[char] === undefined) {
        node.child[char] = new Node(node.value + char);
      }
      node.cnt++;
      node = node.child[char];
    }
  }
  search(value) {
    let node = this.root;
    for (let i = 0; i < value.length; i++) {
      let char = value[i];
      if (node.child[char] === undefined) return 0;
      node = node.child[char];
    }
    return node.cnt;
  }
}

function solution(words, queries) {
  let trieObj = {};
  let reversedTrieObj = {};
  let answer = [];

  for (let word of words) {
    let key = word.length;
    let reversedWord = word.split("").reverse().join("");

    if (!trieObj[key]) {
      trieObj[key] = new Trie();
      reversedTrieObj[key] = new Trie();
    }
    trieObj[key].push(word);
    reversedTrieObj[key].push(reversedWord);
  }

  let keys = Object.keys(trieObj).map(Number);

  for (let query of queries) {
    let isReversed = query[0] === "?" ? true : false;
    let key = query.length;
    let w = query.replaceAll("?", "");
    w = isReversed ? w.split("").reverse().join("") : w;

    if (!keys.includes(key)) {
      answer.push(0);
      continue;
    }
    isReversed
      ? answer.push(reversedTrieObj[key].search(w))
      : answer.push(trieObj[key].search(w));
  }
  return answer;
}

solution(
  ["frodo", "front", "frost", "frozen", "frame", "kakao"],
  ["fro??", "????o", "fr???", "fro???", "pro?"]
);
