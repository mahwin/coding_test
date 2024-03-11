function sumArr(arr) {
  return arr.reduce((a, c) => c + a, 0);
}

function checkCanDivied(arr1, arr2) {
  const totalSum = sumArr(arr1) + sumArr(arr2);
  return totalSum % 2 === 0;
}

function solution(queue1, queue2) {
  // 모든 요소의 합을 2로 나눌 수 없다면 두 개의 큐에 나눠 담을 수 없다.
  if (!checkCanDivied(queue1, queue2)) return -1;

  // 주의에 오버플로우 발생할 수 있다고 하니 BigInt를 사용하자.
  let queue1Sum = BigInt(sumArr(queue1));
  const totalSum = queue1Sum + BigInt(sumArr(queue2));
  const targetSum = totalSum / 2n;

  // 시도 횟수가 얼마를 넘어가면 불가능 하다고 판단 내려야할까
  // worst를 고려해보자

  // [a,b,c] [d,e,f]
  // ...
  // [f] [a,b,c,d,e] => worst
  // queue2를 queue1으로 모두 옮긴다 n
  // 2n크기의 queue1을 하나만 남기고 모두 queue2로 옮긴다. 2n-1

  // 총 3n - 1

  const maxTrial = 3 * queue1.length + 1;
  let trial = 0;

  // 아래 코드는 시간초과로 76점을 받음.
  // queue1 = queue1.map(BigInt);
  // queue2 = queue2.map(BigInt);
  // while(trial < maxTrial){
  //     if(queue1Sum === targetSum) return trial;
  //     else if(queue1Sum > targetSum ){
  //         const first = queue1.shift();
  //         queue2.push(first);
  //         queue1Sum-=first;
  //     }
  //     else {
  //         const first = queue2.shift();
  //         queue1.push(first);
  //         queue1Sum += first;
  //     }
  //     trial++;
  // }

  // Queue를 구현하자

  const q1 = new Queue();
  const q2 = new Queue();
  queue1.forEach((num) => q1.insert(BigInt(num)));
  queue2.forEach((num) => q2.insert(BigInt(num)));

  while (trial < maxTrial) {
    if (queue1Sum === targetSum) return trial;
    else if (queue1Sum > targetSum) {
      const first = q1.pop();
      q2.insert(first);
      queue1Sum -= first;
    } else {
      const first = q2.pop();
      q1.insert(first);
      queue1Sum += first;
    }
    trial++;
  }

  return -1;
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insert(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.size++;
  }
  pop() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this.size--;
    return data;
  }
}
