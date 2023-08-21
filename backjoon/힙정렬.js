class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);

    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[curIdx] > this.heap[parIdx]) {
      this._swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  pop() {
    let max = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = leftIdx + 1;
    if (!this.heap[leftIdx]) return max;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] > this.heap[curIdx]) this._swap(curIdx, leftIdx);
      return max;
    }

    while (
      this.heap[leftIdx] > this.heap[curIdx] ||
      this.heap[rightIdx] > this.heap[curIdx]
    ) {
      const maxIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? leftIdx : rightIdx;
      this._swap(curIdx, maxIdx);

      curIdx = maxIdx;
      leftIdx = maxIdx * 2;
      rightIdx = leftIdx + 1;
    }
    return max;
  }
  getHeap() {
    return this.heap.slice(1);
  }
}

const heap = new MaxHeap();
const n = 6;
let input = "3 6 4 8 9 7".split(" ").map(Number);

for (const num of input) {
  heap.push(num);
}

let sortedArr = Array.from({ length: n });

console.log(heap.getHeap());

for (let i = 1; i <= n; i++) {
  sortedArr[n - i] = heap.pop();
}

console.log(sortedArr);
