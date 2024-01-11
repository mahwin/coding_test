let input = `4
2 KIWI BANANA
2 KIWI APPLE
2 APPLE APPLE
3 APPLE BANANA KIWI`.split("\n");

class Node {
  constructor(value = "", depth = 0) {
    this.value = value;
    this.child = {};
    this.depth = depth;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  push(words) {
    let current = this.root;
    for (const word of words) {
      if (current.child[word] === undefined) {
        let depth = current.depth;
        current.child[word] = new Node(word, depth + 1);
      }

      current = current.child[word];
    }
  }
}

const solution = () => {
  const N = +input.shift();
  const trie = new Trie();
  input.forEach((el) => {
    const [_, ...words] = el.split(" ");
    trie.push(words);
  });
  let result = "";
  const dfs = (node) => {
    const keys = Object.keys(node.child).sort();
    if (!keys.length) return;
    for (let key of keys) {
      result += "--".repeat(node.depth) + key + "\n";
      dfs(node.child[key]);
    }
  };

  dfs(trie.root);
  console.log(result.trim());
};

solution();
