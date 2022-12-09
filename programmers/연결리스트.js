class Node {
  constructor(data) {
    this.data = data;
  }
}

class LinkedList {
  constructor() {
    let init = new Node("head");
    this.head = init;
    this.tail = init;
    this.currentNode = undefined;
    this.size = 0;
  }

  length() {
    return this.size;
  }
  append(data) {
    let newNode = new Node(data);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size += 1;
  }
  getArray() {
    let currentNode = this.head;
    currentNode = currentNode.next;
    let arr = [];

    for (let i = 0; i < this.size; i++) {
      arr.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return arr;
  }

  insert(index, data) {
    let currentNode = this.head;
    currentNode = currentNode.next;

    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next;
    }

    let newNode = new Node(data);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    this.size += 1;
  }
}
