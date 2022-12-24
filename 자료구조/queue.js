// class Queue {
//   constructor() {
//     this.storage = {};
//     this.head = 0;
//     this.tail = 0;
//   }
//   enqueue(data) {
//     this.storage[this.tail] = data;
//     this.tail++;
//   }

//   dequeue() {
//     let removed = this.storage[this.head];
//     delete this.storage[this.head];
//     this.head++;
//     return removed;
//   }
//   isEmpty() {
//     return this.head - this.tail === 0 ? true : false;
//   }
// }

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

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.size++;
  }
  dequeue() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = thia.head.next;
    this.size--;
    return data;
  }

  getQueue() {
    if (!this.head) return null;
    let node = this.head;
    const array = [];
    while (node) {
      array.push(node.data);
      node = node.next;
    }
    return array;
  }
}
