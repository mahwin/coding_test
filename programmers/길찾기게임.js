class Node {
  constructor(x, y, index) {
    this.index = index;
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
    if (this.root === null) {
      this.root = node;
      return;
    }
    if (this.root.x > node.x) {
      if (this.root.left === null) {
        this.root.left = new BinaryTree(node);
        return;
      } else {
        this.root.left.add(node);
      }
    } else {
      if (this.root.right === null) {
        this.root.right = new BinaryTree(node);
        return;
      } else {
        this.root.right.add(node);
      }
    }
  }
  preorder(tmp) {
    tmp.push(this.root.index);
    if (this.root.left !== null) this.root.left.preorder(tmp);
    if (this.root.right !== null) this.root.right.preorder(tmp);
  }

  postorder(tmp) {
    if (this.root.left !== null) this.root.left.postorder(tmp);
    if (this.root.right !== null) this.root.right.postorder(tmp);
    tmp.push(this.root.index);
  }
}

function solution(nodeinfo) {
  const binaryTree = new BinaryTree();
  nodeinfo = nodeinfo.map(([x, y], index) => {
    return [index + 1, x, y];
  });
  nodeinfo.sort((a, b) => a[2] - b[2]);
  let maxY = nodeinfo[nodeinfo.length - 1][2];

  while (nodeinfo.length) {
    let sameHeight = nodeinfo.filter((el) => el[2] === maxY);

    sameHeight.forEach(([index, x, y]) => {
      let node = new Node(x, y, index);
      binaryTree.add(node);
    });
    nodeinfo = nodeinfo.filter((el) => el[2] !== maxY);
    maxY--;
  }

  let [arr1, arr2] = [[], []];
  binaryTree.postorder(arr1);
  binaryTree.preorder(arr2);
  return [arr2, arr1];
}

console.log(
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
  ])
);
