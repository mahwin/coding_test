const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `(1+(2*(3+4)))`;
let set = new Set();
const v = Array.from({ length: input.length }, () => false);

const findBracket = () => {
  let result = [];
  let pre = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] == ")") result.push([pre.pop(), i]);
    else if (input[i] == "(") pre.push(i);
  }
  return result;
};

const cal = () => {
  let string = "";
  for (let i = 0; i < input.length; i++) {
    if (v[i]) continue;
    string += input[i];
  }

  return string;
};

const dfs = (arr, node) => {
  set.add(cal());

  for (let i = node; i < arr.length; i++) {
    arr[i].forEach((idx) => (v[idx] = true));
    dfs(arr, i + 1);
    arr[i].forEach((idx) => (v[idx] = false));
  }
};

const solution = () => {
  const arr = findBracket();
  dfs(arr, 0);
  set.delete(input);
  return [...set].sort().join("\n");
};

console.log(solution());
