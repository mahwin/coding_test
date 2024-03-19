class Node {
  constructor(x, y, idx) {
    this.idx = idx;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }
  add(node) {
    if (!this.root) {
      this.root = node;
      return;
    }

    let root = this.root;

    if (root.x > node.x) {
      if (root.left === null) {
        root.left = new BinaryTree(node);
        return;
      }
      root.left.add(node);
      return;
    }

    if (root.x < node.x) {
      if (root.right === null) {
        root.right = new BinaryTree(node);
        return;
      }
      root.right.add(node);
      return;
    }
  }
}

function solution(nodeinfo) {
  nodeinfo = nodeinfo.map((el, i) => [...el, i + 1]);
  nodeinfo.sort((a, b) => b[1] - a[1]);

  const binaryTree = new BinaryTree();

  for (let i = 0; i < nodeinfo.length; i++) {
    const [x, y, idx] = nodeinfo[i];
    const nextNode = new Node(x, y, idx);
    binaryTree.add(nextNode);
  }

  const root = binaryTree;

  return [preSearch(binaryTree), postSearch(binaryTree)];
}

function preSearch(binaryTree) {
  let pre = [];

  function recur(node) {
    pre.push(node.idx);
    if (node.left) recur(node.left.root);
    if (node.right) recur(node.right.root);
  }
  recur(binaryTree.root);
  return pre;
}

function postSearch(binaryTree) {
  let post = [];

  function recur(node) {
    if (node.left) recur(node.left.root);
    if (node.right) recur(node.right.root);
    post.push(node.idx);
  }
  recur(binaryTree.root);
  return post;
}
