`문자 - a1,a2,a3,...an, b1,...,bn 으로 연결된 링크드 리스트를 a1,b1,a2,b2,...an,bn으로 재배열하기 `;

// 단방향
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(node) {
    if (this.head === null) {
      this.head = node;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.next = node;
  }

  delete(node) {
    // console.log(node);
    if (node === this.head) {
      if (this.head.next === null) this.head = null;
      else {
        this.head = this.head.next;
      }
      return;
    }
    let current = this.head;

    while (current.next !== null) {
      if (current.next === node) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
  insert(preNode, insertNode) {
    let tmpNode = preNode.next;
    preNode.next = insertNode;
    insertNode.next = tmpNode;
  }
  print() {
    let current = this.head;
    let datas = [current.data];
    while (current.next !== null) {
      current = current.next;
      datas.push(current.data);
    }
    console.log(datas.join(" "));
  }
}

function solution() {
  let array = ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5"];

  const linkedList = new LinkedList();

  array.forEach((num) => linkedList.add(new Node(num)));

  let slower = linkedList.head;
  let faster = linkedList.head.next;

  while (faster.next !== null) {
    slower = slower.next;
    faster = faster.next.next;
  }

  let start = linkedList.head;
  let startHalf = slower.next;

  let sortedLikedList = new LinkedList();

  sortedLikedList.add(new Node(start.data));
  sortedLikedList.add(new Node(startHalf.data));

  while (startHalf.next !== null) {
    start = start.next;
    startHalf = startHalf.next;
    sortedLikedList.add(new Node(start.data));
    sortedLikedList.add(new Node(startHalf.data));
  }

  sortedLikedList.print();
}

solution();
