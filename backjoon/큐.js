class Node {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.tail = null;
    this.head = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  pop() {
    if (!this.head) return -1;
    let value = this.head.val;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  getArr() {
    if (!this.head) return null;
    let node = this.head;
    const result = [];

    while (node) {
      result.push(node.val);
      node = node.next;
    }
    return result;
  }

  isEmpty() {
    return this.size === 0 ? 1 : 0;
  }

  getFront() {
    return this.head ? this.head.val : -1;
  }

  getBack() {
    return this.tail ? this.tail.val : -1;
  }

  getSize() {
    return this.size;
  }
}

let input = `15
push 1
push 2
front
back
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
front`.split("\n");

let N = input[0];

let queue = new Queue();
let answer = [];
for (let i = 1; i < N; i++) {
  [command, val] = input[i].split(" ");
  if (command === "push") answer.push(queue.push(Number(val)));
  if (command === "size") answer.push(queue.getSize());
  if (command === "front") answer.push(queue.getFront());
  if (command === "back") answer.push(queue.getBack());
  if (command === "empty") answer.push(queue.isEmpty());
  if (command === "pop") answer.push(queue.pop());
}
