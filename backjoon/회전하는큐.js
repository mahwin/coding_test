let input = `10 3
2 9 5`.split("\n");

class Node {
  constructor(value = null) {
    this.value = value;
    this.pre = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0 ? true : false;
  }

  init() {
    this.head = null;
    this.tail = null;
  }

  popLeft() {
    if (this.isEmpty()) return null;

    let temp = this.head.next;
    let node = this.head;
    this.head = temp;
    this.length--;
    if (this.length === 0) this.init();
    return node.value;
  }

  popRight() {
    if (this.isEmpty()) return null;
    let temp = this.tail.pre;
    let node = this.tail;
    this.tail = temp;
    this.length--;
    if (this.length === 0) this.init();
    return node.value;
  }

  pushLeft(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      let temp = this.head;
      node.next = temp;
      temp.pre = node;
      this.head = node;
    }
    this.length++;
  }

  pushRight(value) {
    const node = new Node(value);
    if (this.tail === null) {
      this.tail = node;
      this.head = node;
    } else {
      let temp = this.tail;
      node.pre = temp;
      temp.next = node;
      this.tail = node;
    }
    this.length++;
  }
  findShortest(num) {
    //전방에서 찾기
    let node = this.head;
    let startHead = 0;
    while (node.value !== num) {
      startHead++;
      node = node.next;
    }
    //후방에서 찾기
    node = this.tail;
    let startTail = 0;
    while (node.value !== num) {
      startTail++;
      node = node.pre;
    }
    if (startHead > startTail) return { type: "tail", idx: startTail };
    else return { type: "head", idx: startHead };
  }
}

const solution = () => {
  const [n, k] = input[0].split(" ").map(Number);
  const nums = input[1].split(" ").map(Number);
  const list = new LinkedList();
  for (let i = 1; i <= n; i++) {
    list.pushRight(i);
  }
  let result = 0;
  nums.forEach((num) => {
    let { type, idx } = list.findShortest(num);

    result += idx;
    if (type === "tail") {
      while (idx--) {
        const value = list.popRight();
        console.log(list.tail.value);
        list.pushLeft(value);
      }
      list.popRight();
    } else {
      while (idx--) {
        list.pushRight(list.popLeft());
      }

      list.popLeft();
    }
    console.log(list.getArray());
  });
  return result;
};

console.log(solution());
