// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 시간초과,
// 벡터 내적 이용해서 다시 풀기
let input = `5
-1 1
-1 0
0 0
1 0
1 1`.split("\n");

const calDist = (pos1, pos2) =>
  (pos1[0] - pos2[0]) ** 2n + (pos1[1] - pos2[1]) ** 2n;

const check = (pos1, pos2, pos3) => {
  const d1 = calDist(pos1, pos2);
  const d2 = calDist(pos1, pos3);
  const d3 = calDist(pos2, pos3);
  if (d1 + d2 == d3 || d2 + d3 == d1 || d1 + d3 == d2) return true;
  return false;
};

const solution = () => {
  const n = Number(input.shift());
  input = input.map((el) => el.split(" ").map((num) => BigInt(num)));
  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (check(input[i], input[j], input[k])) result++;
      }
    }
  }
  console.log(result);
};

solution();
