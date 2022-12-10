class Node {
  constructor(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(root = null) {
    //초기 루트 null
    this.root = root;
  }

  add(node) {
    //루트가 없으면 들어온 값 루트로 설정
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
  preorder(answer) {
    answer.push(this.root.index);
    if (this.root.left !== null) this.root.left.preorder(answer);
    if (this.root.right !== null) this.root.right.preorder(answer);
  }

  postorder(answer) {
    if (this.root.left !== null) this.root.left.postorder(answer);
    if (this.root.right !== null) this.root.right.postorder(answer);
    answer.push(this.root.index);
  }
}

const solution = (nodeinfo) => {
  let binaryTree = new BinaryTree();

  nodeinfo = nodeinfo.map((el, index) => {
    return [index + 1, el[0], el[1]];
  });

  nodeinfo.sort((a, b) => a[2] - b[2]);
  let y = nodeinfo[nodeinfo.length - 1][2];

  while (nodeinfo.length) {
    let sameYNodes = nodeinfo.filter((node) => y === node[2]);
    nodeinfo = nodeinfo.filter((node) => y !== node[2]);

    sameYNodes.forEach((el) => {
      let node = new Node(el[0], el[1], el[2]);
      binaryTree.add(node);
    });
    y--;
  }
  console.log(binaryTree);
  let preOrder = [];
  let postOrder = [];
  binaryTree.preorder(preOrder);
  binaryTree.postorder(postOrder);
  return [preOrder, postOrder];
};

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
