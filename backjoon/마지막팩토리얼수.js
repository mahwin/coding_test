const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

const solution = () => {
  const N = Number(input);
  let mul = 1;
  for (let i = 2; i <= N; i++) {
    let tmp = i;
    while (tmp % 10 == 0) tmp /= 10;
    mul *= temp;
    while (mul % 10 == 0) mul /= 10;
    mul %= 1000000;
  }
  console.log(mul % 10);
};

solution();
