let input = `8 17
...XXXXXX..XX.XXX
....XXXXXXXXX.XXX
...XXXXXXXXXXXX..
..XXXXX.LXXXXXX..
.XXXXXX..XXXXXX..
XXXXXXX...XXXX...
..XXXXX...XXX....
....XXXXX.XXXL...`.split("\n");

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size += 1;
  }

  dequeue() {
    const popItem = this.head;
    this.head = this.head.next;
    this.size -= 1;
    return popItem.item;
  }
}

const solution = () => {
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  const 백조 = [];
  const board = [];
  const Wqueue = new Queue();
  for (let i = 0; i < rowLen; i++) {
    const lakeInfo = input[i].split("");
    for (let j = 0; j < colLen; j++) {
      if (lakeInfo[j] === "L") {
        lakeInfo[j] = ".";
        백조.push([i, j]);
        Wqueue.enqueue([i, j]);
      } else if (lakeInfo[j] == ".") Wqueue.enqueue([i, j]);
    }
    board.push(lakeInfo);
  }

  const isValid = (r, c) => {
    if (r >= rowLen || c >= colLen || c < 0 || r < 0) return false;
    return true;
  };
  const isNextLake = (Wqueue) => {
    let len = Wqueue.size;
    for (let i = 0; i < len; i++) {
      const [r, c] = Wqueue.dequeue();
      for (const d of dirs) {
        const nr = d[0] + r;
        const nc = d[1] + c;
        if (isValid(nr, nc) && board[nr][nc] === "X") {
          board[nr][nc] = ".";
          Wqueue.enqueue([nr, nc]);
        }
      }
    }
  };

  const isCanReach = (board, 백조) => {
    const q = new Queue();
    q.enqueue(백조[0]);
    const v = Array.from({ length: rowLen }, () =>
      Array.from({ length: colLen }, () => false)
    );

    while (q.size !== 0) {
      const [r, c] = q.dequeue();
      if (r === 백조[1][0] && c === 백조[1][1]) return true;

      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];
        if (isValid(nr, nc) && board[nr][nc] == "." && !v[nr][nc]) {
          v[nr][nc] = true;
          q.enqueue([nr, nc]);
        }
      }
    }
    return false;
  };
  let day = 1;
  while (1) {
    isNextLake(Wqueue);
    if (isCanReach(board, 백조)) return day;
    day++;
  }
};

console.log(solution());
