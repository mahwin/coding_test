let input = `5 7
0 1 0 1 1
0 1 7
0 2 2
1 2 4
1 3 3
1 4 6
2 3 2
3 4 1`.split("\n");

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
    return this.heap[idx][1];
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

let parser = (info) => info.split(" ").map(Number);
let graph, canVisit, n, m; // n 분기점의 수, m 길의 수

const 다익스트라 = () => {
  const pq = new MinHeap();
  pq.heappush([0, 0]);
  const duration = Array.from({ length: n }, () => Infinity);
  duration[0] = 0;
  while (pq.size()) {
    const [cNode, cTime] = pq.heappop(); // 우선순위 큐에서 탐색할 노드 선택
    if (duration[cNode] < cTime) continue;
    for (let i = 0; i < graph[cNode].length; i++) {
      const [nNode, nTime] = graph[cNode][i];
      const sum = cTime + nTime;
      if (duration[nNode] > sum) {
        duration[nNode] = sum;
        pq.heappush([nNode, sum]);
      }
    }
  }

  console.log(duration[n - 1] === Infinity ? -1 : duration[n - 1]);
};

const solution = () => {
  [n, m] = parser(input[0]);
  canVisit = parser(input[1]); // 0 or 1 Array, 0이면 갈 수 있고 1이면 못 감
  canVisit[n - 1] = 0; // 마지막 넥서스는 0도 가능
  graph = Array.from({ length: n }, () => []);
  for (let i = 2; i < m + 2; i++) {
    const [from, to, cost] = parser(input[i]);
    if (canVisit[from] || canVisit[to]) continue;
    //양방향
    graph[from].push([to, cost]);
    graph[to].push([from, cost]);
  }

  다익스트라();
};

solution();

// 메모리 140868KB
// 시간 1236ms
