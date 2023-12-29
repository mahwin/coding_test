const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `8 9
1 2 3
1 3 2
1 4 4
2 5 2
3 6 1
4 7 3
5 8 6
6 8 2
7 8 7
1 8`.split("\n");

const solution = () => {
  const [n, m] = input.shift().split(" ").map(Number);

  const d = Array.from({ length: n + 1 }, () => Infinity);
  const graph = {};

  for (let i = 0; i < m; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    if (graph[a]) {
      graph[a].push([b, c]);
    } else {
      graph[a] = [[b, c]];
    }
    if (graph[b]) {
      graph[b].push([a, c]);
    } else {
      graph[b] = [[a, c]];
    }
  }

  const [start, end] = input.pop().split(" ").map(Number);
  const q = [[start, 0]];

  while (q.length !== 0) {
    const costArr = q.map((el) => el[1]);
    const minIdx = costArr.indexOf(Math.min(...costArr));

    const [node, cost] = q[minIdx];
    q.splice(minIdx, 1);

    if (d[node] < cost) continue;
    for (const [nextNode, nextCost] of graph[node]) {
      const addCost = nextCost + cost;

      if (addCost < d[nextNode]) {
        d[nextNode] = addCost;
        q.push([nextNode, addCost]);
      }
    }
  }
  console.log(d[end]);
};

solution();
