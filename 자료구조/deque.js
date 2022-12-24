class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  unshift(value) {
    const element = new Node(value);
    if (this.head === null) {
      this.head = element;
      this.tail = element;
    } else {
      let curr = this.head;
      element.next = curr;
      curr.prev = element;
      this.head = element;
    }
    this.count++;
  }

  push(value) {
    const element = new Node(value);
    if (this.tail === null) {
      this.head = element;
      this.tail = element;
    } else {
      this.tail.next = element;
      element.prev = this.tail;
      this.tail = element;
    }
    this.count++;
  }

  shift() {
    if (this.count === 0) return null;

    let temp = this.head.next;
    let node = this.head;
    this.head = temp;

    // node.prev = null;
    // node.next = null;

    this.count--;

    if (this.count == 0) {
      this.head = null;
      this.tail = null;
    }
    return node.value;
  }

  pop() {
    if (this.count === 0) return null;
    let temp = this.tail.prev;
    let node = this.tail;
    this.tail = temp;
    // node.prev = null;
    // node.next = null;
    this.count--;
    if (this.count === 0) {
      this.head = null;
      this.tail = null;
    }
    return node.value;
  }
  getArray() {
    if (this.count !== 0) {
      let temp = this.head;
      let arr = [];
      while (temp) {
        arr.push(temp.value);
        temp = temp.next;
      }
      return arr;
    }
  }
}
