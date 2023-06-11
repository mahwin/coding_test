// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split(" ");

let input = `10000000 3 3`.split(" ");

const cal = (num1, num2) => Math.floor(num1 / num2);

function solution() {
  const [n, p, q] = input.map(Number);

  const obj = { 0: 1 };

  const dfs = (node) => {
    if (!obj[node]) obj[node] = dfs(cal(node, p)) + dfs(cal(node, q));
    return obj[node];
  };
  console.log(dfs(n));
}

solution();
