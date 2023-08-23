const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  const n = Number(input.shift());
  input.push(input[0]);
  input = input.map((el) => el.split(" ").map(Number));
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += input[i][0] * input[i + 1][1];
    sum -= input[i][1] * input[i + 1][0];
  }
  return (Math.round((Math.abs(sum) / 2) * 10) / 10).toFixed(1);
};

console.log(solution());
