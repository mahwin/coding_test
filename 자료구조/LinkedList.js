class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }
  insertLast(data) {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  }
  insertAt(data, index) {
    if (index < 0 || index > this.size) return 0;

    if (index === 0) return this.insertFirst(data);

    const node = new Node(data);
    let current, preNode;

    current = this.head;
    let count = 0;
    while (count < index) {
      preNode = current;
      count++;
      current = current.next;
    }
    node.next = current;
    preNode.next = node;

    this.size++;
  }

  getAt(index) {
    let current = this.head;

    if (index > this.size) return null;

    while (index--) {
      current = current.next;
    }
    return current.data;
  }

  removeAt(index) {
    if (index < 0 || index > this.size) return;

    let current = this.head;
    let previous;
    let count = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (index > count) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
}
