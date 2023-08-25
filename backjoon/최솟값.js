let input = `10 4
75
30
100
38
50
51
52
20
81
5
1 10
3 5
6 9
8 10`.split("\n");

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class SegmentTree {
  constructor(nums) {
    this.nums = nums;
    this.depth = this.getDepth();
    this.tree = Array.from({ length: 2 ** (this.depth + 1) }, () => Infinity); // 세그먼트 트리 배열
    this.init();
  }

  getDepth() {
    let k = 1;
    while (2 ** k < this.nums.length) {
      k++;
    }
    return k;
  }

  init() {
    let leftIdx = this.converTreeIdx(0);
    let rightIdx = this.converTreeIdx(this.nums.length);
    for (let i = 0; i < this.nums.length; i++) {
      this.tree[i + leftIdx + 1] = this.nums[i];
    }

    for (let i = rightIdx; i >= 1; i--) {
      let pIdx = Math.floor(i / 2);
      while (pIdx >= 1) {
        this.tree[pIdx] = this.merge(this.tree[pIdx], this.tree[i]);
        pIdx = Math.floor(pIdx / 2);
      }
    }
  }

  merge(leftValue, rightValue) {
    return Math.min(leftValue, rightValue);
  }

  converTreeIdx(idx) {
    return idx + 2 ** this.depth - 1;
  }

  queryRange(start, end) {
    this.min = Infinity;
    const leftIdx = this.converTreeIdx(start);
    const rightIdx = this.converTreeIdx(end);
    this.search(leftIdx, rightIdx);
    return this.min;
  }
  search(leftIdx, rightIdx) {
    if (leftIdx > rightIdx) return;

    if (leftIdx % 2 === 1) this.min = this.merge(this.min, this.tree[leftIdx]);

    if (rightIdx % 2 === 0)
      this.min = this.merge(this.min, this.tree[rightIdx]);

    this.search(Math.floor((leftIdx + 1) / 2), Math.floor((rightIdx - 1) / 2));
  }
}

function solution() {
  let [N, M] = input[0].split(" ").map(Number);
  const arr = input.slice(1, N + 1).map(Number);

  const segTree = new SegmentTree(arr);

  let result = [];
  for (let qIdx = N + 1; qIdx <= N + M; qIdx++) {
    result.push(segTree.queryRange(...input[qIdx].split(" ").map(Number)));
  }
  console.log(result.join("\n"));
}

solution();
