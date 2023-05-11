// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString();

let input = "10 4 2 10";

const solution = () => {
  const [n, l, w, h] = input.split(" ").map(Number);
  let left = 0;
  let right = Math.max(l, w, h);
  // 바이너리 서치
  for (let i = 0; i < 10000; i++) {
    const mid = (left + right) / 2;

    let cnt = 1;
    for (const len of [l, w, h]) {
      cnt *= Math.floor(len / mid);
    }

    if (cnt >= n) {
      left = mid;
    } else {
      right = mid;
    }
  }
  console.log(right);
};

solution();
