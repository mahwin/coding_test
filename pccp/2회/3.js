// class Node {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.size = 0;
//   }

//   enqueue(data) {
//     const node = new Node(data);
//     if (!this.head) this.head = node;
//     else this.tail.next = node;

//     this.tail = node;
//     this.size++;
//   }
//   dequeue() {
//     if (!this.head) return null;
//     const data = this.head.data;
//     this.head = this.head.next;
//     this.size--;
//     return data;
//   }
// }

// function solution(menu, order, k) {
//   let waitQueue = new Queue();
//   let lastTime = Math.max(...menu) * order.length;
//   let max = 0;
//   for (let time = 0; time <= lastTime; time++) {
//     if (time % k === 0 && time / k < order.length) {
//       let idx = time / k;
//       waitQueue.enqueue(menu[order[idx]]);
//     }
//     if (waitQueue.size === 0) continue;

//     waitQueue.head.data--;
//     if (waitQueue.head.data === 0) waitQueue.dequeue();

//     max = waitQueue.size > max ? waitQueue.size : max;
//   }

//   return max;
// }

function solution(menu, order, k) {
  let answer = 0;
  const queue = [];
  let last = 0;
  for (let i = 0; i < order.length; i++) {
    const time = k * i;
    while (queue[0] <= time) {
      queue.shift();
    }
    last = Math.max(time, last) + menu[order[i]];
    queue.push(last);
    answer = Math.max(queue.length, answer);
  }

  return answer;
}
