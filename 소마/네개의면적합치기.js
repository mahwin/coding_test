let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let boxSet = new Set();

for (let i = 0; i < input.length; i++) {
  [r1, c1, r2, c2] = input[i].split(" ").map(Number);
  for (let row = r1; row < r2; row++) {
    for (let col = c1; col < c2; col++) {
      boxSet.add([row, col].join(","));
    }
  }
}
console.log(boxSet.size);
