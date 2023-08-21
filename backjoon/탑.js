let input = `30
1 2 3 4 5 6 7 8 9 10 9 8 7 6 5 4 3 2 1 2 3 4 5 6 7 8 9 10 10 10`.split("\n");
// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const solution = () => {
  const n = Number(input[0]);
  const result = Array.from({ length: n }, () => 0);
  input[1] = input[1].split(" ").map(Number);
  let stack = [];
  for (let i = 0; i < n; i++) {
    const cur = input[1][i];
    if (!stack.length) {
      stack.push([cur, i + 1]);
      continue;
    }
    while (stack.length && stack[stack.length - 1][0] < cur) {
      stack.pop();
    }
    for (let j = stack.length - 1; j > -1; j--) {
      if (stack[j][0] > cur) {
        result[i] = stack[j][1];
        break;
      }
    }
    stack.push([cur, i + 1]);
  }
  return result.join(" ");
};

console.log(solution());
