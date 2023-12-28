// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `8
1 2
1 3
1 4
2 5
2 6
4 7
4 8`.split("\n");

const solution = () => {
  const graph = {};
  const n = Number(input.shift());

  const dp = Array.from({ length: n + 1 }, () => [0, 0]);
  const v = Array.from({ length: n + 1 }, () => false);

  for (let i = 0; i < n - 1; i++) {
    const [pa, so] = input[i].split(" ").map(Number);
    if (graph[pa]) {
      graph[pa].push(so);
    } else {
      graph[pa] = [so];
    }
    if (graph[so]) {
      graph[so].push(pa);
    } else {
      graph[so] = [pa];
    }
  }

  const dfs = (node) => {
    v[node] = true;

    dp[node][0] = 0;
    dp[node][1] = 1;

    for (const link of graph[node]) {
      if (!v[link]) {
        dfs(link);
        dp[node][0] += dp[link][1];
        dp[node][1] += Math.min(dp[link][0], dp[link][1]);
      }
    }
  };
  dfs(1);

  console.log(Math.min(...dp[1]));
};

solution();
