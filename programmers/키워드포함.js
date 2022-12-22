// class Node {
//   constructor(value = "", count = 0) {
//     this.value = value;
//     this.end = false;
//     this.child = {};
//     this.count = count;
//   }
// }

// class Trie {
//   constructor() {
//     this.root = new Node();
//   }
//   add(string) {
//     let currentNode = this.root;
//     currentNode.count++;
//     for (let i = 0; i < string.length; i++) {
//       let char = string[i];
//       if (currentNode.child[char] === undefined) {
//         currentNode.child[char] = new Node(currentNode.value + char, 0);
//       }
//       currentNode = currentNode.child[char];
//       currentNode.count++;
//     }
//     currentNode.end = true;
//   }
//   search(string) {
//     let currentNode = this.root;

//     for (let i = 0; i < string.length; i++) {
//       let char = string[i];
//       if (currentNode.child[char]) {
//         currentNode = currentNode.child[char];
//       } else {
//         return 0;
//       }
//     }
//     return currentNode.count;
//   }
// }

class Node {
  constructor(value = "", count = 0) {
    this.value = value;
    this.count = count;
    this.child = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(string) {
    let currentNode = this.root;
    currentNode.count++;
    // root에도 count++를 해주어야 "?????"같은 가사가 들어왔을 때 제대로된 count 반환 가능
    for (var i = 0; i < string.length; i++) {
      let currentChar = string[i];
      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new Node(
          currentNode.value + currentChar,
          0
        );
      }
      currentNode = currentNode.child[currentChar];
      currentNode.count++; // 문자열이 삽입될 때마다 count++
    }
    currentNode.end = true;
  }

  search(string) {
    let currentNode = this.root;
    for (var i = 0; i < string.length; i++) {
      let currentChar = string[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return 0; // 자식 없으면 0 리턴
      }
    }
    return currentNode.count;
  }
}

function solution(words, queries) {
  let trieTree = new Trie();

  // 1. 단어 길이 별로 트라이 구성하기
  // 2. 양방향으로 구성하기

  let trieObj = {}; // {length :  :{forword: trie1 , backword: trie2}}

  for (let wordLength = 1; wordLength <= 10000; wordLength++) {
    trieObj[wordLength] = { forword: new Trie(), backword: new Trie() };
  }

  words.forEach((word) => {
    let wordLength = word.length;
    trieObj[wordLength].forword.add(word);
    trieObj[wordLength].backword.add(word.split("").reverse().join(""));
  });

  let answer = [];

  const reg = /[^?]+/;
  for (let query of queries) {
    const wordLength = query.length;
    const first = query[0];
    const last = query.slice(-1);
    if (first === "?" && last === "?") {
      answer.push(trieObj[wordLength].forword.root.count);
      continue;
    }
    let str = query.match(reg)[0];
    if (first === "?") {
      answer.push(
        trieObj[wordLength].backword.search(str.split("").reverse().join(""))
      );
    } else {
      answer.push(trieObj[wordLength].forword.search(str));
    }
  }
  return answer;
}

solution(
  ["frodo", "front", "frost", "frozen", "frame", "kakao"],
  ["fro??", "????o", "fr???", "fro???", "pro?", "?????"]
);
