const solutionA = (input) => {
  const n = Number(input.shift());

  const accArr = Array.from({ length: n }, () => 0);

  const pq = new MinHeap();
  const seatPq = new MinHeap();

  for (let i = 0; i < n; i++) {
    seatPq.push([0, i, 0]);
  }

  input = input
    .map((el) => el.split(" ").map(Number))
    .sort((a, b) => a[0] - b[0]);

  let result = 0;
  let tmp = 0;

  input.forEach(([start, end]) => {
    while (pq.peek() && pq.peek()[1] <= start) {
      const [_, __, i] = pq.pop();

      seatPq.push([0, i, 0]);
      tmp--;
    }
    const [a, idx, b] = seatPq.pop();

    pq.push([start, end, idx]);

    accArr[idx] = accArr[idx] + 1;
    tmp++;
    result = Math.max(result, tmp);
  });

  return result + "\n" + accArr.slice(0, result).join(" ");
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    const minItem = this.heap[0];
    const lastItem = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = lastItem;
      this.heapifyDown();
    }
    return minItem;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.hasParent(index) &&
      this.parent(index)[1] > this.heap[index][1]
    ) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index)[1] < this.leftChild(index)[1]
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index][1] < this.heap[smallerChildIndex][1]) {
        break;
      }
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
}
