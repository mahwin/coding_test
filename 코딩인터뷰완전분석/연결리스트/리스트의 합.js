`문제 :  연결리스트로 숫자를 표현할 때 각 노드가 자릿수 하나를 가리키는 방식으로 표현할 수 있따. 각 숫자는 역순으로 배열되어 있다. 두 링크드리스트의
합을 연결리스트로 반환하는 함수를 만들어라
  617 + 295 = 912

  7 -> 1 -> 6 , 5 -> 9 -> 2  => 2 -> 1 -> 9

  다.
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

const solution = (numStr1, numStr2) => {
  let linkedList1 = new LinkedList();
  let linkedList2 = new LinkedList();

  let [longStr, shortStr] =
    numStr1.length > numStr2.length ? [numStr1, numStr2] : [numStr2, numStr1];

  shortStr = "0".repeat(longStr.length - shortStr.length) + shortStr;

  for (let i = longStr.length - 1; i >= 0; i--) {
    linkedList1.add(new Node(longStr[i]));
  }

  for (let i = longStr.length - 1; i >= 0; i--) {
    linkedList2.add(new Node(shortStr[i]));
  }

  let pointerOne = linkedList1.head;
  let pointerTwo = linkedList2.head;

  let sumLinkedList = new LinkedList();

  let 올림수 = 0;
  while (pointerOne !== null || pointerTwo !== null || 올림수 !== 0) {
    let sum = 0;
    if (pointerOne !== null) {
      sum += +pointerOne.data;
      pointerOne = pointerOne.next;
    }

    if (pointerTwo !== null) {
      sum += +pointerTwo.data;
      pointerTwo = pointerTwo.next;
    }

    sum += 올림수;
    올림수 = 0;
    if (sum >= 10) {
      올림수 = 1;
      sum -= 10;
    }

    sumLinkedList.add(new Node(sum));
  }
  sumLinkedList.print();
};

solution("6170", "295");
