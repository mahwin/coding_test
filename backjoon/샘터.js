const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `2 100000
-100000000 100000000`.split("\n");

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  pop() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this.size--;
    return data;
  }
  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const visited = new Set();

  const [N, K] = input[0].split(" ").map(Number);

  const q = new Queue();
  input[1]
    .split(" ")
    .map(Number)
    .forEach((샘터) => {
      q.push([샘터, 0, -1]);
      q.push([샘터, 0, 1]);
      visited.add(샘터);
    });
  let result = 0;
  let target = 0;

  while (!q.isEmpty()) {
    const [pos, distance, dir] = q.pop();
    const nextPos = pos + dir;
    if (visited.has(nextPos)) continue;

    target++;
    result += distance + 1;
    if (target === K) return result;

    visited.add(nextPos);
    q.push([nextPos, distance + 1, dir]);
  }
};

console.log(solution());
