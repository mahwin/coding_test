// let input = `5 3
// 1 3 5 6 10`.split("\n");
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);
input = input[0].split(" ").map(Number);

const solution = () => {
  const diffArr = [];
  let cost = 0;
  for (let i = 1; i < n; i++) {
    diffArr.push(input[i] - input[i - 1]);
  }
  diffArr.sort((a, b) => a - b);

  for (let i = 0; i < diffArr.length - k + 1; i++) {
    cost += diffArr[i];
  }
  console.log(cost);
};

solution();
