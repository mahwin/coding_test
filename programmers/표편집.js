class Node {
  constructor(val, prevNode = null) {
    this.val = val;
    this.prev = prevNode;
    this.next = null;
  }
}

function solution(n, k, cmd) {
  let answer = Array.from({ length: n }, () => "O");

  let prevNode = new Node(0);

  let pointer = prevNode;

  for (let val = 1; val < n; val++) {
    const nextNode = new Node(val, prevNode);
    prevNode.next = nextNode;
    prevNode = nextNode;
    if (val === k) pointer = nextNode;
  }

  const stack = [];

  for (let command of cmd) {
    let [c, count] = command.split(" ");

    if (c === "D") {
      let index = 0;
      while (pointer.next && count > index) {
        index++;
        pointer = pointer.next;
      }
    }
    if (c === "U") {
      let index = 0;
      while (pointer.prev && count > index) {
        index++;
        pointer = pointer.prev;
      }
    }
    if (c === "C") {
      stack.push(pointer);
      const next = pointer.next;
      const prev = pointer.prev;

      if (next && prev) {
        prev.next = next;
        next.prev = prev;
        pointer = pointer.next;
      } else if (next) {
        //prev가 없다 ? 제일 앞이다.
        next.prev = null;
        pointer = next;
      } else if (prev) {
        //next가 없다 ? 제일 뒤다.
        prev.next = null;
        pointer = prev;
      }
    }
    if (c === "Z") {
      const newNode = stack.pop();
      const prev = newNode.prev;
      const next = newNode.next;
      if (prev) {
        prev.next = newNode;
      }
      if (next) {
        next.prev = newNode;
      }
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
