// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `3
4 4
3 4
2 4`.split("\n");

function solution() {
  let N = +input.shift();
  input = input.map((v) => v.split(" ").map(Number));
  input.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else return a[1] - b[1];
  });
  let result = 0;
  let curTime = 0;
  for (const [start, end] of input) {
    if (curTime <= start) {
      curTime = end;
      result++;
    }
  }
  console.log(result);
}

solution();
