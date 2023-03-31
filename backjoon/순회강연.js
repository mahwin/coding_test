class minHeap {
  constructor() {
    this.heap = [];
    this.heap.push(-Infinity);
  }
  insert(val) {
    this.heap.push(val);
    this.upheap(this.heap.length - 1);
  }
  upheap(pos) {
    let tmp = this.heap[pos];
    while (tmp < this.heap[parseInt(pos / 2)]) {
      this.heap[pos] = this.heap[parseInt(pos / 2)];
      pos = parseInt(pos / 2);
    }
    this.heap[pos] = tmp;
  }
  get() {
    if (this.heap.length === 2) return this.heap.pop();
    let res = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.downheap(1, this.heap.length - 1);
    return res;
  }
  downheap(pos, len) {
    let tmp = this.heap[pos],
      child;
    while (pos <= parseInt(len / 2)) {
      child = pos * 2;
      if (child < len && this.heap[child] > this.heap[child + 1]) child++;
      if (tmp <= this.heap[child]) break;
      this.heap[pos] = this.heap[child];
      pos = child;
    }
    this.heap[pos] = tmp;
  }
  size() {
    return this.heap.length - 1;
  }
  front() {
    return this.heap[1];
  }
}

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
let n = Number(input[0]);
if (n === 0) {
  console.log(0);
  return 0;
}
let arr = new Array(n);
let pq = new minHeap();
let time = 0;
let ans = 0;
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(2);
}
for (let i = 0; i < n; i++) {
  arr[i][0] = Number(input[i + 1].split(" ")[0]);
  arr[i][1] = Number(input[i + 1].split(" ")[1]);
}
arr.sort((a, b) => a[1] - b[1]);

time = 1;
pq.insert(arr[0][0]);
for (let i = 1; i < arr.length; i++) {
  if (time < arr[i][1]) {
    pq.insert(arr[i][0]);
    time++;
  } else {
    if (pq.front() < arr[i][0]) {
      pq.get();
      pq.insert(arr[i][0]);
    }
  }
}
let pq_size = pq.size();
for (let i = 0; i < pq_size; i++) {
  ans += pq.get();
}
console.log(ans);
