const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(Number(line));
});

rl.on("close", () => {
  solution();
  process.exit();
});

const solution = () => {
  const n = input.shift();
  input = input.sort((a, b) => b - a);
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (input.length > i + 2) {
      result += input[i] + input[i + 1];
      i += 2;
    } else result += input[i];
  }
  console.log(result);
};
