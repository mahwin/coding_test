class Node {
  constructor(val, prevNode) {
    this.val = val;
    this.next = null;
    this.prev = prevNode;
  }
}

function solution(n, k, cmd) {
  let answer = Array.from({ length: n }).fill("O");
  let prevNode = new Node(0);
  let pointerNode = prevNode;

  for (let val = 1; val < n; val++) {
    const nextNode = new Node(val, prevNode);
    prevNode.next = nextNode;
    prevNode = nextNode;

    if (val === k) pointerNode = nextNode;
  }
  let stack = [];
  for (let command of cmd) {
    let [c, count] = command.split(" ");
    let i = 0;
    switch (c) {
      case "U":
        while (pointerNode.prev && i < count) {
          i++;
          pointerNode = pointerNode.prev;
        }
        break;
      case "D":
        while (pointerNode.next && i < count) {
          i++;
          pointerNode = pointerNode.next;
        }
        break;
      case "C":
        stack.push(pointerNode);
        const prev = pointerNode.prev;
        const next = pointerNode.next;

        if (prev && next) {
          prev.next = next;
          next.prev = prev;
          pointerNode = pointerNode.next;
        } else if (prev) {
          prev.next = null;
          pointerNode = prev;
        } else if (next) {
          next.prev = null;
          pointerNode = next;
        }
        break;

      case "Z":
        const insertNode = stack.pop();
        const prevNode = insertNode.prev;
        const nextNode = insertNode.Node;
        if (prevNode) {
          prevNode.next = insertNode;
        }
        if (nextNode) {
          nextNode.prev = insertNode;
        }
        break;
    }
  }

  stack.forEach((node) => {
    answer[node.val] = "X";
  });

  return answer.join("");
}

console.log(
  solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"])
);
