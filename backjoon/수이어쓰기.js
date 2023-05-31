// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = `20 23`;

const solution = () => {
  const [n, k] = input.split(" ").map(Number);
  let len = 0;
  for (let i = 1; i <= n; i++) {
    const char = i.toString();
    if (char.length + len >= k) {
      return char[k - len - 1];
    }
    len += char.length;
  }
  return -1;
};

console.log(solution());
