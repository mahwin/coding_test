let input = `6 15
1 2 1
1 3 2
1 4 3
1 5 4
1 6 6
2 3 1
2 4 2
2 5 3
2 6 4
3 4 1
3 5 2
3 6 3
4 5 1
4 6 2
5 6 1
1 6`.split("\n");

// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(process.cwd(), "./1.txt");
// let input = fs.readFileSync(filePath, "utf8").trim().split("\n");

class PQ {
  constructor() {
    this.arr = new Array();
    this.arr.push("");
  }

  push(cost, elem) {
    this.arr.push([cost, elem]);
    let curPosition = this.arr.length - 1;

    while (
      1 < curPosition &&
      this.arr[curPosition][0] < this.arr[Math.floor(curPosition / 2)][0]
    ) {
      let tmp = this.arr[Math.floor(curPosition / 2)];
      this.arr[Math.floor(curPosition / 2)] = this.arr[curPosition];
      this.arr[curPosition] = tmp;
      curPosition = Math.floor(curPosition / 2);
    }
  }

  pop() {
    if (this.arr.length <= 1) return null;
    let curPosition = 1;
    let last = this.arr[curPosition];
    if (2 < this.arr.length) this.arr[curPosition] = this.arr.pop();
    else this.arr.pop();

    while (curPosition * 2 < this.arr.length) {
      if (
        curPosition * 2 + 1 < this.arr.length &&
        this.arr[curPosition * 2 + 1][0] <= this.arr[curPosition * 2][0] &&
        this.arr[curPosition * 2 + 1][0] < this.arr[curPosition][0]
      ) {
        //양쪽이 있고 왼쪽이 작을 경우
        let tmp = this.arr[curPosition * 2 + 1];
        this.arr[curPosition * 2 + 1] = this.arr[curPosition];
        this.arr[curPosition] = tmp;
        curPosition = curPosition * 2 + 1;
      } else if (this.arr[curPosition * 2][0] < this.arr[curPosition][0]) {
        let tmp = this.arr[curPosition * 2];
        this.arr[curPosition * 2] = this.arr[curPosition];
        this.arr[curPosition] = tmp;
        curPosition = curPosition * 2;
      } else {
        break;
      }
    }

    return last;
  }
  isEmpty() {
    return this.arr.length > 1 ? false : true;
  }
}

const solution = () => {
  const [N, M] = input.shift().split(" ").map(Number);
  const graph = {};

  for (let i = 1; i <= N; i++) {
    graph[i] = [];
  }
  const [startNode, endNode] = input.pop().split(" ").map(Number);
  let routeObj;

  const 다익 = (startNode, visited) => {
    const pq = new PQ();
    pq.push(0, startNode);

    d[startNode] = 0;

    while (!pq.isEmpty()) {
      const [cost, node] = pq.pop();
      if (d[node] < cost) continue;

      for (const [nextNode, nextCost] of graph[node]) {
        if (visited[nextNode]) continue;
        const addCost = cost + nextCost;
        if (d[nextNode] > addCost) {
          d[nextNode] = addCost;
          pq.push(addCost, nextNode);
        }
      }
    }
  };

  for (let i = 0; i < M; i++) {
    const [from, to, cost] = input[i].split(" ").map(Number);
    graph[from].push([to, cost]);
    graph[to].push([from, cost]);
  }

  for (let node = 1; node <= N; node++) {
    graph[node].sort((a, b) => a[0] - b[0]);
  }

  const init = () => {
    d = Array.from({ length: N + 1 }, () => Infinity);
    routeObj = { totalCost: Infinity, routes: "" };
  };

  const visited = Array.from({ length: N + 1 }, () => false);

  init();
  다익(endNode, visited);

  let cur = startNode;
  let result = 0;

  while (cur !== endNode) {
    for (const [nextNode, nextCost] of graph[cur]) {
      // console.log(result, nextCost, nextNode, d);
      if (result + nextCost + d[nextNode] == d[startNode]) {
        result += nextCost;
        visited[nextNode] = true;
        cur = nextNode;
        break;
      }
    }
  }

  init();
  visited[endNode] = false;
  다익(endNode, visited);

  result += d[startNode];
  console.log(result);
};

solution();
