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

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const getCombination = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, index) => {
    const tmp = getCombination(arr.slice(index + 1), pick - 1);
    tmp.forEach((el) => result.push([fixed, ...el]));
  });
  return result;
};

const bfs = (hospital, virus, n, min) => {
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  const queue = new Queue();
  hospital.forEach(([r, c]) => (v[r][c] = true));
  hospital.forEach((pos) => queue.enqueue([...pos, 0]));

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  if (!virus.length) return 0;

  while (queue.getSize() !== 0) {
    const [r, c, cnt] = queue.dequeue();
    if (min === cnt) return cnt;
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && !v[nr][nc] && board[nr][nc] !== 1) {
        if (board[nr][nc] === 0)
          virus.splice(virus.indexOf([nr, nc].join(",")), 1);
        if (!virus.length) return cnt + 1;

        v[nr][nc] = true;
        queue.enqueue([nr, nc, cnt + 1]);
      }
    }
  }

  return -1;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const board = [];
const virus = [];
const hospital = [];
let n, m;
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  [n, m] = input[0].split(" ").map(Number);

  for (let i = 1; i <= n; i++) {
    board.push(input[i].split(" ").map(Number));
  }

  //0 바이러스 ,1 벽, 2 병원
  for (let i = 1; i <= n; i++) {
    let rowInfo = input[i].split(" ").map(Number);
    board.push(rowInfo);
    for (let j = 0; j < n; j++) {
      if (rowInfo[j] === 0) {
        virus.push([i - 1, j].join(","));
      } else if (rowInfo[j] === 2) {
        hospital.push([i - 1, j]);
      }
    }
  }

  const hospitalLen = hospital.length;

  const combis = getCombination(
    Array.from({ length: hospitalLen }, (_, i) => i),
    m
  );
  let min = Infinity;
  for (const com of combis) {
    let pickedHos = [];
    let copyVirus = [...virus];

    com.forEach((el) => pickedHos.push(hospital[el]));

    let result = bfs(pickedHos, copyVirus, n, min);

    if (result !== -1) min = Math.min(result, min);
  }

  console.log(min === Infinity ? -1 : min);

  process.exit();
});
