let input = `5
2 1 1
1 2 4
3 2 2
2 1 5
3 2 5
3 3 1
2 1 2
3 1 8
3 2 4
4 5 1
4 1 1
2 4 10
3 1 2
2 3 2
3 2 2
4 5 1
3 2 2
2 3 2
3 1 2
2 4 10
4 1 1`
  .trim()
  .split("\n");

// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  size() {
    return this.heap.length - 1;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx].cost > this.heap[curIdx].cost) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curidx = 1;
    let leftidx = curidx * 2;
    let rightidx = curidx * 2 + 1;

    if (!this.heap[leftidx]) return min;
    if (!this.heap[rightidx]) {
      if (this.heap[leftidx].cost < this.heap[curidx].cost) {
        this.swap(leftidx, curidx);
      }
      return min;
    }

    while (
      leftidx < this.size() &&
      (this.heap[leftidx].cost < this.heap[curidx].cost ||
        this.heap[rightidx].cost < this.heap[curidx].cost)
    ) {
      const minidx =
        this.heap[leftidx].cost > this.heap[rightidx].cost ? rightidx : leftidx;
      this.swap(minidx, curidx);
      curidx = minidx;
      leftidx = curidx * 2;
      rightidx = curidx * 2 + 1;
    }

    return min;
  }
}

const 다익스트라 = (n, c, graph) => {
  const d = Array.from({ length: n + 1 }, () => Infinity);
  d[c] = 0;
  const pq = new MinHeap();
  pq.push({ vertix: c, cost: 0 });

  while (pq.size()) {
    const { vertix, cost } = pq.pop();

    if (d[vertix] < cost) continue;

    for (const [nextNode, nextCost] of graph[vertix]) {
      const newCost = cost + nextCost;
      if (d[nextNode] > newCost) {
        d[nextNode] = newCost;
        pq.push({ vertix: nextNode, cost: newCost });
      }
    }
  }
  return d;
};

const solution = () => {
  const cases = Number(input[0]);
  let idx = 1;
  for (let i = 0; i < cases; i++) {
    const [n, d, c] = input[idx++].split(" ").map(Number);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let j = 0; j < d; j++) {
      const [a, b, cost] = input[idx++].split(" ").map(Number);
      graph[b].push([a, cost]);
    }
    const diks = 다익스트라(n, c, graph);
    const canReached = diks.filter((el) => el !== Infinity);
    console.log(canReached.length, Math.max(...canReached));
  }
};

solution();
