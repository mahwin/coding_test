let input = `6 8
4 5 3
2 4 0
4 1 4
2 1 1
5 6 1
3 6 2
3 2 6
3 4 4`.split("\n");

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1; // 첫 인덱스는 버리고 사용함
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  getValue(idx) {
    if (this.size() < idx) return undefined;
    return this.heap[idx];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.getValue(parIdx) > this.getValue(curIdx)) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.getMin();

    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.getValue(leftIdx) < this.getValue(curIdx)) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      this.getValue(leftIdx) < this.getValue(curIdx) ||
      this.getValue(rightIdx) < this.getValue(curIdx)
    ) {
      const minIdx =
        this.getValue(leftIdx) > this.getValue(rightIdx) ? rightIdx : leftIdx;

      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

let n, m, graph; //n 헛간 수, m 길

const parser = (info) => info.split(" ").map(Number);

const 다익스트라 = () => {
  const pq = new MinHeap();
  pq.heappush([0, 0]);
  const d = Array.from({ length: n }, () => Infinity); // 경로를 거쳐서 가는 경우의 정보를 저장
  while (pq.size()) {
    const [cNode, cCost] = pq.heappop();

    if (d[cNode] < cCost) continue;

    for (let i = 0; i < graph[cNode].length; i++) {
      const [nNode, nCost] = graph[cNode][i];
      const sumCost = nCost + cCost;
      if (d[nNode] > sumCost) {
        d[nNode] = sumCost;
        pq.heappush([nNode, sumCost]);
      }
    }
  }
  console.log(d[n - 1]);
};

const solution = () => {
  [n, m] = parser(input[0]);

  //graph 채우기
  graph = Array.from({ length: n }, () => []);

  for (let i = 1; i <= m; i++) {
    const [from, to, cost] = parser(input[i]);
    graph[from - 1].push([to - 1, cost]);
    graph[to - 1].push([from - 1, cost]);
  }

  다익스트라();
};

solution();
