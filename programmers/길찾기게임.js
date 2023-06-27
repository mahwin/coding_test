class Node {
  constructor(idx, x, y) {
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

  push(node) {
    // 루트 노드가 없으면 루트 노드로 설정
    if (!this.root) {
      this.root = node;
      return;
    }

    if (this.root.x > node.x) {
      //루트 x가 현재 노드의 x보다 더 크다면 현재 노드를 왼쪽에 배치
      if (!this.root.left) {
        this.root.left = new BinaryTree(node);
        return;
      } else {
        this.root.left.push(node);
      }
    } else {
      //루트 x가 현재 노드의 x보다 더 작다면 현재 노드를 오른쪽에 배치
      if (!this.root.right) {
        this.root.right = new BinaryTree(node);
        return;
      } else {
        this.root.right.push(node);
      }
    }
  }
}

const getPre = (pre, tree) => {
  pre.push(tree.root.idx);
  if (tree.root.left) getPre(pre, tree.root.left);
  if (tree.root.right) getPre(pre, tree.root.right);
};

const getPost = (post, tree) => {
  if (tree.root.left) getPost(post, tree.root.left);
  if (tree.root.right) getPost(post, tree.root.right);
  post.push(tree.root.idx);
};

const solution = (nodeInfo) => {
  let tree = new BinaryTree();

  nodeInfo = nodeInfo.map((el, i) => [i + 1, el[0], el[1]]); // 정렬하기 전에 node의 인덱스 추가
  nodeInfo.sort((a, b) => b[2] - a[2]); // y 좌표 내림 차순으로 정렬

  for (let i = 0; i < nodeInfo.length; i++) {
    tree.push(new Node(...nodeInfo[i]));
  }
  let pre = [];
  let post = [];
  getPre(pre, tree);
  getPost(post, tree);
  return [pre, post];
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
