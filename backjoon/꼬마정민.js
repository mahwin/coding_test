const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = `77 77 7777`;

const solution = () => {
  return input
    .split(" ")
    .map(Number)
    .reduce((p, c) => (p += c), 0);
};

console.log(solution());
