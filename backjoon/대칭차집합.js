// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `3 5
1 2 4
2 3 4 5 6`.split("\n");

const solution = () => {
  const A = input[1].split(" ").map(Number);
  const B = input[2].split(" ").map(Number);
  const unionSet = new Set();
  A.forEach((num) => unionSet.add(num));
  B.forEach((num) => unionSet.add(num));
  const intersection = A.length + B.length - unionSet.size;
  return A.length + B.length - 2 * intersection;
};

console.log(solution());
