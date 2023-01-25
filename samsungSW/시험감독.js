// let input = `5
// 1 1 1 1 1
// 4 1`.split("\n");

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let student = input[1].split(" ").map(Number);
let [main, sub] = input[2].split(" ").map(Number);

let cnt = 0n;
cnt += BigInt(student.length);

student.forEach((el) => {
  if (el > main) {
    cnt += BigInt(Math.ceil((el - main) / sub));
  }
});

console.log(Number(cnt));
