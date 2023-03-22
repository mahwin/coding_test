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

  getSize() {
    return this.size;
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

  getQueue() {
    if (!this.head) return null;
    let node = this.head;
    const array = [];
    while (node) {
      array.push(node.data);
      node = node.next;
    }
    return array;
  }
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  let board = [];
  const [n, low, high] = input[0].split(" ").map(Number);

  for (let i = 1; i <= n; i++) {
    board.push(input[i].trim().split(" ").map(Number));
  }

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n) return false;
    return true;
  };

  const bfs = (v, row, col) => {
    let eggSum = board[row][col];
    const queue = new Queue();
    queue.enqueue([row, col]);

    const root = [[row, col]];

    while (queue.getSize() !== 0) {
      const [r, c] = queue.dequeue();

      for (const d of dirs) {
        const nr = d[0] + r;
        const nc = d[1] + c;
        if (isValid(nr, nc) && !v[nr][nc]) {
          const diff = Math.abs(board[r][c] - board[nr][nc]);

          if (diff >= low && diff <= high) {
            eggSum += board[nr][nc];
            root.push([nr, nc]);
            queue.enqueue([nr, nc]);
            v[nr][nc] = true;
          }
        }
      }
    }

    if (root.length === 1) return false;
    else {
      let egg = Math.floor(eggSum / root.length);
      root.forEach(([r, c]) => {
        board[r][c] = egg;
        v[r][c] = true;
      });
      return true;
    }
  };

  let flag = true;
  let result = 0;
  while (flag) {
    flag = false;

    let v = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => false)
    );

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (v[r][c]) continue;
        v[r][c] = true;
        const isChange = bfs(v, r, c);
        if (isChange) flag = true;
      }
    }
    if (flag) result++;
  }
  console.log(result);

  process.exit();
});
