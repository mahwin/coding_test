// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input = [];
// let graph = {};
// let N, M, from, to;
// let maxWeight = -Infinity;
// let v; // 방문 체크

// rl.on("line", (line) => {
//   input.push(line.trim());
// });

// rl.on("close", () => {
//   solution();
//   process.exit();
// });

// const canGo = (w) => {
//   v = Array.from({ length: N + 1 }, () => false);
//   v[to] = true;
//   const queue = [to];

//   while (queue.length) {
//     const node = queue.shift();
//     if (node === from) return true;
//     graph[node].forEach(([nextNode, limit]) => {
//       if (!v[nextNode] && limit >= w) {
//         v[nextNode] = true;
//         queue.push(nextNode);
//       }
//     });
//   }
//   return false;
// };

// const bs = () => {
//   let [l, r] = [1, maxWeight];

//   while (l <= r) {
//     const mid = Math.floor((l + r) / 2);
//     if (canGo(mid)) {
//       l = mid + 1;
//     } else {
//       r = mid - 1;
//     }
//   }
//   return r;
// };

// const solution = () => {
//   [N, M] = input[0].split(" ").map(Number);

//   //그래프 완성
//   for (let i = 1; i <= M; i++) {
//     const [A, B, C] = input[i].split(" ").map(Number);
//     maxWeight = Math.max(C, maxWeight);
//     graph[A] = graph[A] ? [...graph[A], [B, C]] : [[B, C]];
//     graph[B] = graph[B] ? [...graph[B], [A, C]] : [[A, C]];
//   }

//   [from, to] = input[M + 1].split(" ").map(Number);
//   console.log(bs());
// };

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
let input = `3 3
1 2 2
3 1 3
2 3 2
1 3`.split("\n");
let graph = {};
let N, M, from, to;
let maxWeight = -Infinity;
let v; // 방문 체크
const canGo = (w) => {
  v = Array.from({ length: N + 1 }, () => false);
  v[to] = true;
  const queue = [to];

  while (queue.length) {
    const node = queue.shift();
    if (node === from) return true;
    graph[node].forEach(([nextNode, limit]) => {
      if (!v[nextNode] && limit >= w) {
        v[nextNode] = true;
        queue.push(nextNode);
      }
    });
  }
  return false;
};

const bs = () => {
  let [l, r] = [1, maxWeight];

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (canGo(mid)) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return r;
};

const solution = () => {
  [N, M] = input[0].split(" ").map(Number);
  graph = new Array(N + 1).fill(null).map((_) => []);

  //그래프 완성
  for (let i = 1; i <= M; i++) {
    const [A, B, C] = input[i].split(" ").map(Number);
    maxWeight = Math.max(C, maxWeight);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
  }

  [from, to] = input[M + 1].split(" ").map(Number);
  console.log(bs());
};

solution();
