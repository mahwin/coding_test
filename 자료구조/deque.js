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
    this.size = 0;
  }

  isEmpty() {
    if (this.size) return false;
    else return true;
  }

  pushFront(element) {
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

  pushBack(element) {
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

  popFront() {
    if (this.isEmpty()) {
      let temp = this.head;
      temp.next.prev = null;
      this.head = temp.next;
      this.count--;

      return temp.value;
    }
  }

  popBack() {
    if (this.isEmpty()) {
      let temp = this.tail;
      temp.prev.next = null;
      this.tail = temp.prev;
      this.count--;
      return temp.value;
    }
  }
  print() {
    let curr = this.head;
    while (curr) {
      console.log(curr.value);
      curr = curr.next;
    }
  }
  front() {
    return this.head.value;
  }
  back() {
    return this.tail.value;
  }
  length() {
    return this.count;
  }
}

const deque = new Deque();

deque.pushBack(new Node(0));

deque.pushBack(new Node(1));

deque.pushBack(new Node(2));

deque.pushBack(new Node(3));

deque.pushBack(new Node(4));

let remain = deque.popBack();

deque.pushFront(new Node(remain));
deque.print();
