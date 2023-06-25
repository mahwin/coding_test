class Node {
  constructor(data, pre, next = null) {
    this.data = data;
    this.pre = pre;
    this.next = next;
  }
}

const deleteSelectedNode = (selectedNode, deleteStack) => {
  const preNode = selectedNode.pre;
  const nextNode = selectedNode.next;
  deleteStack.push(selectedNode);
  if (nextNode) selectedNode = nextNode;
  else selectedNode = preNode;

  if (preNode) preNode.next = nextNode;
  if (nextNode) nextNode.pre = preNode;
  return selectedNode;
};

const moveNode = (selectedNode, d, cnt) => {
  for (let i = 0; i < cnt; i++) {
    if (!selectedNode[d]) return selectedNode;
    selectedNode = selectedNode[d];
  }
  return selectedNode;
};

const backDeleteNode = (deleteStack) => {
  if (deleteStack.length == 0) return;

  const node = deleteStack.pop();
  const preNode = node.pre;
  const nextNode = node.next;

  if (preNode) preNode.next = node;
  if (nextNode) nextNode.pre = node;
};

function solution(n, k, cmd) {
  const deleteStack = [];
  let preNode = new Node(0); // 시작 노드
  let selectedNode = preNode;

  for (let i = 1; i < n; i++) {
    const curNode = new Node(i, preNode);
    preNode.next = curNode;
    preNode = curNode;
    if (i == k) selectedNode = curNode;
  }
  let d, cnt;
  for (let i = 0; i < cmd.length; i++) {
    switch (cmd[i]) {
      case "C":
        selectedNode = deleteSelectedNode(selectedNode, deleteStack);
        break;
      case "Z":
        backDeleteNode(deleteStack);
        break;
      default:
        [d, cnt] = cmd[i].split(" ");
        d = d === "D" ? "next" : "pre";
        cnt = +cnt;
        selectedNode = moveNode(selectedNode, d, cnt);
    }
  }

  const result = Array.from({ length: n }, () => "O");
  deleteStack.forEach((node) => {
    result[node.data] = "X";
  });
  return result.join("");
}

console.log(
  solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"])
);
