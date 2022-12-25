// 힙이란?
// 완전 이진 트리.  우선순위 큐를 구현하는데 밑받침이 되는 자료구조. 트리 구조( 시간 복잡도 logN )

// 힙에서 부모 - 자식 간의 관계
// 힙은 배열을 통해 완전 이진트리 형태를 구현한다. 보통의 완전 이진트리와 다른 점은 반정렬 상태를 유지한다는 것이다.
// 최소 힙을 예로 들면 부모와 자식의 정렬 상태는 일반 정렬 상태지만 (최소 힙에선 부모가 더 작다) 자식과 자식들 사이의 배열은 정렬되어있지 않다.

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

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      this.heap[leftIdx] < this.heap[curIdx] ||
      this.heap[rightIdx] < this.heap[curIdx]
    ) {
      const minIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

function solution(n, k, enemy) {
  let heap = new MinHeap();
  let answer = 0;

  for (let i = 0; i < enemy.length; i++) {
    if (heap.size() < k) {
      heap.heappush(enemy[i]);
      answer++;
    } else {
      // 5) Heap의 최솟 값을 찾는다.
      let min = heap.getMin();

      // 6) Heap의 최솟 값이 공격하는 값보다 작을 때
      if (enemy[i] > min) {
        // 7) 보유한 병사(n)수에 최솟 값을 뺀다.
        n -= min;

        // 8) Heap 최솟 값을 공격 값과 교체
        heap.heappop(min);
        heap.heappush(enemy[i]);
      } else {
        // 9) Heap의 최솟 값보다 크면 해당 공격 값을 보유한 병사(n)수에서 뺀다.
        n -= enemy[i];
      }
      // 10) 보유한 병사(n)수가 0보다 클때만 라운드(answer) 증가
      n >= 0 && answer++;
    }
  }
  return answer;
}
solution(7, 3, [4, 2, 4, 5, 3, 3, 1]);
