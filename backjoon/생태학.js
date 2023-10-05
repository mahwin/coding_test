const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  let 종 = {};
  let total = input.length * 0.01;
  input.forEach((name) => {
    if (종[name]) {
      종[name]++;
    } else {
      종[name] = 1;
    }
  });
  let result = [];
  const names = Object.keys(종).sort();

  names.forEach((name) => {
    result.push(`${name} ${(종[name] / total).toFixed(4)}`);
  });
  console.log(result.join("\n"));
};

solution();
