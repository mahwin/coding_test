// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input = [];
// rl.on("line", (line) => {
//   input.push(line);
// }).on("close", () => {
//   solution();
//   process.exit();
// });

let input = `3
1 2 3`.split("\n");

class Node {
  constructor(value, index) {
    this.value = value;
    this.next = null;
    this.index = index;
    this.pre = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  add(value, index) {
    const newNode = new Node(value, index);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.pre = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }
  size() {
    return this.size;
  }

  print() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join(" "));
  }
}

function solution() {
  const N = Number(input.shift());
  const linked = new LinkedList();
  input = input[0].split(" ").map(Number);

  for (let i = 0; i < N; i++) {
    linked.add(input[i], i);
  }

  while (linked.size !== 1) {
    let current = linked.head;
    let next = current.next;

    if (current.value >= next.value) {
      current.value += next.value;
      current.next = next.next;
      next.next.pre = current;
      linked.size--;
    }
    current = current.next;

    while (linked.tail.index !== current.index) {
      pre = current.pre;
      next = current.next;

      let leftJoin = false;
      let rightJoin = false;

      if (current.value >= pre.value) {
        leftJoin = true;
        linked.size--;
      }

      if (current.value >= next.value) {
        rightJoin = true;
        linked.size--;
      }
      if (leftJoin && rightJoin) {
        current.value += pre.value + next.value;
        pre.pre.next = current;
        current.next = next.next;
        next.next.pre = current;
      }

      if (leftJoin) {
        current.value += pre.value;
        if (pre.index === linked.head.index) {
          linked.head = current;
        } else {
          pre.pre.next = current;
          current.pre = pre.pre;
        }
      }

      if (rightJoin) {
        current.value += next.value;
        current.next = next.next;
        next.next.pre = current;
      }
      current = current.next;
    }

    pre = current.pre;

    if (current.value >= pre.value) {
      if (pre.index === linked.head.index) {
        linked.head = current;
      } else {
        pre.pre.next = current;
        current.pre = pre.pre;
      }
      current.value += pre.value;

      linked.size--;
    }
  }

  console.log(linked.head.value);
  console.log(linked.head.index + 1);
}

solution();
