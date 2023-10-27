const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `4
5
5
5
5`.split("\n");

const solution = () => {
  input = input.map((num) => Number(num));

  const n = Number(input[0]);

  const stack = [];
  for (let i = 1; i <= n; i++) {
    if (stack.length && stack.at(-1) >= input[i]) {
      continue;
    }
    stack.push(input[i]);
  }

  const stack2 = [];
  for (let i = n; i >= 1; i--) {
    if (stack2.length && stack2.at(-1) >= input[i]) {
      continue;
    }
    stack2.push(input[i]);
  }

  return [stack.length, stack2.length].join("\n");
};

console.log(solution());
