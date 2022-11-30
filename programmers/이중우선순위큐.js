class MinHeap {
  constructor() {
    this.heap = [null];
  }
  _swap(n1, n2) {
    [this.heap[n1], this.heap[n2]] = [this.heap[n2], this.heap[n1]];
  }

  push(val) {
    this.heap.push(val);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    // 부모 값이 더 크면 자식과 스왑
    while (parentIdx !== 0 && this.heap[curIdx] < this.heap[parentIdx]) {
      //스왑
      this._swap(curIdx, parentIdx);
      curIdx = parentIdx; //스왑 후 부모 위치에서 위에 부모가 있다면 다시 검증
      parentIdx = Math.floor(curIdx / 2);
    }
  }
  maxPop() {
    if (this.heap.length === 1) return; // 비었으면 종료
    if (this.heap.length === 2) return this.heap.pop(); // 요소가 하나면 그 값이 max or min임
    const parentIdx = Math.floor((this.heap.length - 1) / 2);
    const lastLeaf = this.heap.slice(parentIdx);
    const max = Math.max(...lastLeaf);

    this._swap(parentIdx + lastLeaf.indexOf(max), this.heap.length - 1);
    //swap 후 자식과 부모 사이를 확인 해줘야 맞지만 push할 때 자동으로 배열 고쳐주니 안 해도됨.
    //왜냐면 pop하려고 할 때 부모 노드들과 자식 노드들 전체에서 max 값을 찾기 때문임.
    return this.heap.pop();
  }
  minPop() {
    if (this.heap.length === 1) return; // 비었으면 종료
    if (this.heap.length === 2) return this.heap.pop(); // 요소가 하나면 그 값이 max or min임
    const min = this.heap[1]; //최소 힙이라서 제일 위의 노드가 최솟값
    this.heap[1] = this.heap.pop();
    let [current, left, right] = [1, 2, 3];

    while (
      (this.heap[left] && this.heap[current] > this.heap[left]) ||
      (this.heap[right] && this.heap[current] > this.heap[right])
    ) {
      if (!this.heap[left]) this._swap(right, current);
      else if (!this.heap[right]) this._swap(left, current);
      else if (this.heap[left] > this.heap[right]) {
        this._swap(current, right);
        current = right;
      } else if (this.heap[left] <= this.heap[right]) {
        this._swap(current, left);
        current = left;
      }
      left = current * 2;
      right = left + 1;
    }
    return min;
  }
}

function solution(operations) {
  const minHeap = new MinHeap();
  operations.forEach((operation) => {
    let [order, val] = operation.split(" ");
    if (order === "I") minHeap.push(+val);
    else if (val === "1") minHeap.maxPop();
    else minHeap.minPop();
  });

  if (minHeap.heap.length === 1) return [0, 0];
  if (minHeap.heap.length === 2) return [heap[1], heap[1]];

  const parent = Math.floor((minHeap.heap.length - 1) / 2);
  return [Math.max(...minHeap.heap.slice(parent)), minHeap.heap[1]];
}

console.log(
  solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"])
);
