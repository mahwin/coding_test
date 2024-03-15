`문제 : x가 주어질 때 x보다 작은 노드들을 x보다 크거나 같은 노드들 보다 앞에 오도록 배치하라
  3 5 8 5 10 2 1
  x는 5다.
`;

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

    let curNode = this.head;
    while (curNode.next !== null) {
      curNode = curNode.next;
    }

    curNode.next = node;
  }

  print() {
    let datas = [this.head.data];
    let cur = this.head;
    while (cur.next !== null) {
      cur = cur.next;
      datas.push(cur.data);
    }
    console.log(datas.join("->"));
  }
}

const solution = (arr, x) => {
  const originLinked = new LinkedList();

  arr.forEach((data) => {
    originLinked.add(new Node(data));
  });

  const leftLinked = new LinkedList();
  const rightLinked = new LinkedList();

  let cur = originLinked.head;

  while (cur.next !== null) {
    if (cur.data < x) {
      leftLinked.add(new Node(cur.data));
    } else {
      rightLinked.add(new Node(cur.data));
    }
    cur = cur.next;
  }

  if (cur.data < x) {
    leftLinked.add(new Node(cur.data));
  } else {
    rightLinked.add(new Node(cur.data));
  }

  let leftNode = leftLinked.head;
  while (leftNode.next !== null) {
    leftNode = leftNode.next;
  }

  leftNode.next = rightLinked.head;
  leftLinked.print();
};

const arr = [3, 5, 8, 5, 10, 2, 1];
solution(arr, 5);
