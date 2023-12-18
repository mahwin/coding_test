const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const solution = () => {
  const n = input.shift();
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (check(input[i])) result++;
  }
  return result;
};

const check = (str) => {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (!stack.length) {
      stack.push(str[i]);
      continue;
    }
    if (stack.at(-1) === str[i]) {
      stack.pop();
    } else {
      stack.push(str[i]);
    }
  }
  return stack.length ? false : true;
};

console.log(solution());
