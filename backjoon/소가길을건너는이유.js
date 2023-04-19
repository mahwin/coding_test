// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `8
3 1
3 0
6 0
2 1
4 1
3 0
4 0
3 1`.split("\n");

const n = Number(input[0]);

let cow = {};
let result = 0;
for (let i = 1; i <= n; i++) {
  const [cowNumber, l_r] = input[i].split(" ").map(Number);
  if (cow[cowNumber] === undefined) cow[cowNumber] = l_r;
  else if (cow[cowNumber] !== l_r) {
    cow[cowNumber] = l_r;
    result++;
  }
}

console.log(result);
