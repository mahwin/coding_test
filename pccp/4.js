// class MinHeap {
//   constructor() {
//     this.heap = [null];
//   }

//   size() {
//     return this.heap.length - 1; // 첫 인덱스는 버리고 사용함
//   }

//   getMin() {
//     return this.heap[1] ? this.heap[1] : null;
//   }

//   swap(a, b) {
//     [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
//   }

//   heappush(value) {
//     this.heap.push(value);
//     let curIdx = this.heap.length - 1;
//     let parIdx = (curIdx / 2) >> 0;

//     while (curIdx > 1 && this.heap[parIdx][0] > this.heap[curIdx][0]) {
//       this.swap(parIdx, curIdx);
//       curIdx = parIdx;
//       parIdx = (curIdx / 2) >> 0;
//     }
//   }

//   heappop() {
//     const min = this.heap[1];
//     if (this.heap.length <= 2) this.heap = [null];
//     else this.heap[1] = this.heap.pop();

//     let curIdx = 1;
//     let leftIdx = curIdx * 2;
//     let rightIdx = curIdx * 2 + 1;

//     if (!this.heap[leftIdx]) return min;
//     if (!this.heap[rightIdx]) {
//       if (this.heap[leftIdx][0] < this.heap[curIdx][0]) {
//         this.swap(leftIdx, curIdx);
//       }
//       return min;
//     }

//     while (
//       this.heap[leftIdx][0] < this.heap[curIdx][0] ||
//       this.heap[rightIdx][0] < this.heap[curIdx][0]
//     ) {
//       const minIdx =
//         this.heap[leftIdx][0] > this.heap[rightIdx][0] ? rightIdx : leftIdx;
//       this.swap(minIdx, curIdx);
//       curIdx = minIdx;
//       leftIdx = curIdx * 2;
//       rightIdx = curIdx * 2 + 1;
//     }

//     return min;
//   }
// }

function createHeap() {
  this.arr = [];
  this.compare = (a, b) => {
    if (a[0] < b[0]) return true;
    if (a[0] === b[0] && a[1] < b[1]) return true;
    return false;
  };
  this.size = () => this.arr.length;
  this.push = (value) => {
    let idx = this.arr.length;
    this.arr.push(value);
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.compare(this.arr[idx], this.arr[parent])) {
        [this.arr[idx], this.arr[parent]] = [this.arr[parent], this.arr[idx]];
        idx = parent;
      } else {
        break;
      }
    }
  };
  this.pop = () => {
    const ret = this.arr[0];
    let idx = 0;
    const last = this.arr.pop();
    if (this.arr.length > 0) {
      this.arr[0] = last;
      while (idx < this.arr.length) {
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        let next = left;
        if (!this.arr[left]) {
          break;
        }
        if (this.arr[right] && this.compare(this.arr[right], this.arr[left])) {
          next = right;
        }
        if (this.compare(this.arr[idx], this.arr[next])) {
          break;
        }
        [this.arr[idx], this.arr[next]] = [this.arr[next], this.arr[idx]];
        idx = next;
      }
    }
    return ret;
  };
}

function solution(program) {
  let answer = Array.from({ length: 11 }, () => 0);
  program.sort((a, b) => a[1] - b[1]);
  let lastIdx = program.length - 1;
  const pq = new createHeap();

  let pointer = 0;
  let time = 0;

  while (pointer <= lastIdx || pq.size()) {
    if (pq.size() === 0) {
      time = program[pointer][1];
      while (pointer <= lastIdx && time >= program[pointer][1]) {
        pq.push(program[pointer]);
        pointer++;
      }
    }

    const [p, s, d] = pq.pop();

    answer[p] += time - s;
    time += d;
    while (pointer <= lastIdx && time >= program[pointer][1]) {
      pq.push(program[pointer]);
      pointer++;
    }
  }
  answer[0] = time;
  return answer;
}

console.log(
  solution([
    [2, 0, 10],
    [1, 5, 5],
    [3, 5, 3],
    [3, 12, 2],
  ])
);
