// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `5 4
1 3
4 2
2 5
3 2`.split("\n");

const solution = () => {
  const [n, v] = input[0].split(" ").map(Number);
  const cost = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  for (let i = 1; i <= v; i++) {
    const [from, to] = input[i].split(" ").map(Number);
    cost[from][to] = 2;
    cost[to][from] = 2;
  }

  for (let i = 1; i <= n; i++) {
    cost[i][i] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        cost[j][k] = Math.min(cost[j][i] + cost[i][k], cost[j][k]);
      }
    }
  }
  let result = [null, null, Infinity];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      let dist = 0;
      for (let k = 1; k <= n; k++) {
        dist += Math.min(cost[i][k], cost[j][k]);
      }
      if (dist < result[2]) {
        result = [i, j, dist];
      }
    }
  }
  return result.join(" ");
};

console.log(solution());
