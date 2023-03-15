let input = `3 2
1 65
5 23
2 99
10
2`.split("\n");

class MaxHeap {
  constructor() {
    this.heap = [null];
  }
  size() {
    return this.heap.length - 1; // 첫 인덱스는 버리고 사용함
  }

  getMax() {
    return this.heap[1] ? this.heap[1] : null;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[parIdx] < this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const max = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return max;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] > this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
      }
      return max;
    }

    while (
      this.heap[leftIdx] > this.heap[curIdx] ||
      this.heap[rightIdx] > this.heap[curIdx]
    ) {
      const idx = this.heap[leftIdx] < this.heap[rightIdx] ? rightIdx : leftIdx;
      this.swap(idx, curIdx);
      curIdx = idx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return max;
  }
}

const [n, k] = input[0].split(" ").map(Number);
const gemHeap = new MaxHeap();
let gem = [];
let bag = [];
for (let i = 1; i <= n; i++) {
  gem.push(input[i].split(" ").map(Number));
}

for (let j = n + 1; j < n + k + 1; j++) {
  bag.push(Number(input[j]));
}

gem = gem.sort((a, b) => a[0] - b[0]);

bag = bag.sort((a, b) => a - b);

let gemP = 0;
let result = 0;

for (let bagIdx = 0; bagIdx < k; bagIdx++) {
  while (gemP < n && bag[bagIdx] >= gem[gemP][0]) {
    gemHeap.heappush(gem[gemP][1]);
    gemP++;
  }
  if (gemHeap.size()) {
    result += gemHeap.heappop();
  }
}

console.log(result);
