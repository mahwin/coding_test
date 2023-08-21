// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString();;

let input = "71";

const nextNum = (num) => {
  const sumString = (Number(num[0]) + Number(num[1])).toString();
  return num[1] + sumString[sumString.length - 1];
};

const solution = () => {
  input = input.padStart(2, "0");
  let target = input;
  let result = 1;
  while (true) {
    let next = nextNum(input);
    input = next;

    if (next === target) return result;
    result++;
  }
};

console.log(solution());
