const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  const n = Number(input[0]);
  const nums = input[1].split(" ").map(Number);

  const operInfo = input[2].split(" ").map(Number);

  let min = Infinity;
  let max = -Infinity;

  const dfs = (val, cnt, remainOpers) => {
    if (cnt === n) {
      min = Math.min(min, val);
      max = Math.max(max, val);
      return;
    }
    const [plus, minus, mul] = remainOpers;
    if (plus > 0) dfs(val + nums[cnt], cnt + 1, [plus - 1, minus, mul]);
    if (minus > 0) dfs(val - nums[cnt], cnt + 1, [plus, minus - 1, mul]);
    if (mul > 0) dfs(val * nums[cnt], cnt + 1, [plus, minus, mul - 1]);
  };

  dfs(nums[0], 1, operInfo);
  console.log([min, max].join(" "));
  process.exit();
});
