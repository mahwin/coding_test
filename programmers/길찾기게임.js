class Node {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  push(node) {
    if (this.root === null) {
      this.root = node;
      return;
    }
    if (this.root.x > node.x) {
      if (this.root.left === null) {
        this.root.left = new BinaryTree(node);
        return;
      } else {
        this.root.left.push(node);
      }
    } else {
      if (this.root.right === null) {
        this.root.right = new BinaryTree(node);
        return;
      } else {
        this.root.right.push(node);
      }
    }
  }
  preorder(tmp) {
    tmp.push(this.root.index);
    if (this.root.left) this.root.left.preorder(tmp);
    if (this.root.right) this.root.right.preorder(tmp);
  }

  postorder(tmp) {
    if (this.root.left) this.root.left.postorder(tmp);
    if (this.root.right) this.root.right.postorder(tmp);
    tmp.push(this.root.index);
  }
}

function solution(nodeinfo) {
  nodeinfo = nodeinfo.map((el, index) => [...el, index + 1]); //인덱스 추가

  nodeinfo.sort((a, b) => b[1] - a[1]); // y값이 클 수록 루트 노드에 근접

  const binaryTree = new BinaryTree();
  for (const [x, y, index] of nodeinfo) {
    const node = new Node(x, y, index);
    binaryTree.push(node);
  }
  let [pre, post] = [[], []];
  binaryTree.preorder(pre);
  binaryTree.postorder(post);
  return [pre, post];
}

solution([
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2],
]);
