class Node {
  constructor(data, prevNode = null) {
    this.data = data;
    this.prev = prevNode;
    this.next = null;
  }
}

function solution(n, k, cmd) {
  let answer = Array.from({ length: n }, () => "O");

  let prevNode = new Node(0);

  let pointer = prevNode;

  for (let i = 1; i < n; i++) {
    const nextNode = new Node(i, prevNode);
    prevNode.next = nextNode;
    prevNode = nextNode;
    if (i === k) pointer = nextNode;
  }

  const stack = [];

  cmd.forEach((c) => {
    const [command, num] = c.split(" ");

    if (command === "D") {
      let cnt = 0;
      while (pointer.next && +num > cnt) {
        cnt++;
        pointer = pointer.next;
      }
    }
    if (command === "U") {
      let cnt = 0;
      while (pointer.prev && +num > cnt) {
        cnt++;
        pointer = pointer.prev;
      }
    }
    if (command === "C") {
      stack.push(pointer);
      const next = pointer.next;
      const prev = pointer.prev;

      if (next && prev) {
        prev.next = next;
        next.prev = prev;
        pointer = pointer.next;
      } else if (next) {
        next.prev = null;
        pointer = next;
      } else if (prev) {
        prev.next = null;
        pointer = prev;
      }
    }
    if (command === "Z") {
      const deleteNode = stack.pop();
      const prev = deleteNode.prev;
      const next = deleteNode.next;
      if (prev) {
        prev.next = deleteNode;
      }
      if (next) {
        next.prev = deleteNode;
      }
    }
  });

  stack.forEach((node) => {
    answer[node.data] = "X";
  });
  return answer.join("");
}
