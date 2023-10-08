// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `7
89
5
2
10
-99
7
5`.split("\n");

// 우선순위 큐(최소 힙)
class MinHeap {
  constructor() {
    this.heap = [null];
    this.cnt = 0;
  }

  push(value) {
    // 아래서 위로
    this.heap.push(value);
    this.cnt++;

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] > value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[currentIndex];
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.cnt !== 0) this.cnt--;
    if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우

    // 위에서 아래로
    let returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while (
      this.heap[currentIndex] > this.heap[leftIndex] ||
      this.heap[currentIndex] > this.heap[rightIndex]
    ) {
      const temp = this.heap[currentIndex];

      if (this.heap[leftIndex] > this.heap[rightIndex]) {
        this.heap[currentIndex] = this.heap[rightIndex];
        this.heap[rightIndex] = temp;
        currentIndex = rightIndex;
      } else {
        this.heap[currentIndex] = this.heap[leftIndex];
        this.heap[leftIndex] = temp;
        currentIndex = leftIndex;
      }

      leftIndex = currentIndex * 2;
      rightIndex = leftIndex + 1;
    }

    return returnValue;
  }

  getTop() {
    return this.heap[1];
  }

  size() {
    return this.cnt;
  }
}

// 우선순위 큐(최대 힙)
class MaxHeap {
  constructor() {
    this.heap = [null];
    this.cnt = 0;
  }

  push(value) {
    // 아래서 위로
    this.heap.push(value);
    this.cnt++;

    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[currentIndex];
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.cnt !== 0) this.cnt--;
    if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우

    // 위에서 아래로
    let returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      const temp = this.heap[currentIndex];

      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        this.heap[currentIndex] = this.heap[rightIndex];
        this.heap[rightIndex] = temp;
        currentIndex = rightIndex;
      } else {
        this.heap[currentIndex] = this.heap[leftIndex];
        this.heap[leftIndex] = temp;
        currentIndex = leftIndex;
      }

      leftIndex = currentIndex * 2;
      rightIndex = leftIndex + 1;
    }

    return returnValue;
  }

  getTop() {
    return this.heap[1];
  }

  heap_return() {
    return this.heap;
  }

  size() {
    return this.cnt;
  }
}
// const heap = new MinHeap();

const solution = () => {
  // 두개의 우선순위 큐를 이용하자
  //  큰 수 중간값 작은 수
  // 이렇게 생각하면 큰 수를 모아 놓은 heap의 최소 값과
  // 작은 수를 모아놓은 heap의 최대 값이 중앙값이 되겠네.
  // 그렇게 생각하면 maxheap의 top이 항상 중앙값이 되도록 하자
  // 즉 maxHeap에 작은 수들을 몰아넣고 제일 top이 중앙값이 되도록
  // 다시 생각하면 두 힙의 사이즈가 같다면 max에 넣자.
  // max에 넣어보고 min의 top => 큰 값 중에 최소와
  //             max의 top => 최소 값 중의 최대를 비교
  // 만약 min의 top 보다 max의 top의 값이 swap하는 과정이 잇어야함.
  // 그렇지 않다면 max의 top이 중앙값이다.
  const minHeap = new MinHeap();
  const maxHeap = new MaxHeap();
  const nums = input.map(Number);
  const N = nums[0];
  let result = [];

  for (let i = 1; i <= N; i++) {
    const num = nums[i];
    if (minHeap.size() == maxHeap.size()) {
      maxHeap.push(num);
    } else {
      minHeap.push(num);
    }
    if (minHeap.getTop() < maxHeap.getTop()) {
      let min = minHeap.pop();
      let max = maxHeap.pop();
      maxHeap.push(min);
      minHeap.push(max);
      result.push(maxHeap.getTop());
    } else result.push(maxHeap.getTop());
  }
  console.log(result.join("\n"));
};

solution();
