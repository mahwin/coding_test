const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let info = [];
let n, v, max;
max = -Infinity;
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  n = Number(input[0]);

  for (let i = 1; i <= n; i++) {
    info.push(input[i].split(" ").map(Number));
  }

  v = Array.from({ length: n }, () => false);
  dfs(0, 0);

  console.log(max);
  process.exit();
});

const dfs = (next, earn) => {
  if (earn > max) max = earn;
  for (let i = next; i < n; i++) {
    const [duration, money] = info[i];
    if (duration + i <= n) {
      dfs(duration + i, earn + money);
    }
  }
};
