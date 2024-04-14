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

function solution(rc, operations) {
  const ROW_LENGTH = rc.length;
  const COL_LENGTH = rc[0].length;

  let left = new Deque();
  let right = new Deque();
  let inners = new Deque();

  for (let i = 0; i < ROW_LENGTH; i++) {
    inners.push(new Deque());

    let centerDeque = inners.tail.value;

    for (let j = 0; j < COL_LENGTH; j++) {
      if (j == 0) left.push(rc[i][j]);
      else if (j == COL_LENGTH - 1) right.push(rc[i][j]);
      else centerDeque.push(rc[i][j]);
    }
  }

  for (let operation of operations) {
    if (operation === "ShiftRow") {
      left.unshift(left.pop());
      right.unshift(right.pop());
      inners.unshift(inners.pop());
    } else {
      inners.head.value.unshift(left.shift());
      right.unshift(inners.head.value.pop());
      inners.tail.value.push(right.pop());
      left.push(inners.tail.value.shift());
    }
  }

  for (let i = 0; i < ROW_LENGTH; ++i) {
    let innerDeq = inners.shift();

    for (let j = 0; j < COL_LENGTH; ++j) {
      if (j == 0) {
        rc[i][j] = left.shift();
      } else if (j == COL_LENGTH - 1) {
        rc[i][j] = right.shift();
      } else {
        rc[i][j] = innerDeq.shift();
      }
    }
  }

  return rc;
}
