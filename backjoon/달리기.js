const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.size++;
  }
  dequeue() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this.size--;
    return data;
  }
}

const solution = () => {
  const [N, M, K] = input[0].split(" ").map(Number);
  const board = [];
  for (let i = 1; i <= N; i++) {
    board.push(input[i]);
  }
  const [initR, initC, targetR, targetC] = input
    .pop()
    .split(" ")
    .map((el) => Number(el) - 1);

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r >= N || c >= M || c < 0 || r < 0) return false;
    return true;
  };

  const v = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));
  v[initR][initC] = 0;

  const q = new Queue();
  q.enqueue([initR, initC]);
  while (q.size !== 0) {
    const [r, c] = q.dequeue();
    for (const d of dirs) {
      for (let j = 1; j <= K; j++) {
        let nr = r + d[0] * j;
        let nc = c + d[1] * j;
        if (isValid(nr, nc) && board[nr][nc] === ".") {
          if (v[nr][nc] === 0) {
            v[nr][nc] = v[r][c] + 1;
            if (nr === targetR && nc === targetC) {
              return v[r][c] + 1;
            }
            q.enqueue([nr, nc]);
          } else if (v[nr][nc] <= v[r][c]) break;
        } else break;
      }
    }
  }
  return -1;
};

console.log(solution());
