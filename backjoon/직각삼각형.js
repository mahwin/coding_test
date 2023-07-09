// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `5
-1 1
-1 0
0 0
1 0
1 1`.split("\n");

let n;
let total = 0;

const gcd = (num1, num2) => {
  if (num2 === 0) return num1;
  return gcd(num2, num1 % num2);
};

const cal = (base) => {
  const vectorObj = {};

  for (let i = 0; i < n; i++) {
    if (base === i) continue;
    let x = input[i][0] - input[base][0];
    let y = input[i][1] - input[base][1];
    let g = gcd(x, y);
    g = g < 0 ? -g : g;
    x /= g;
    y /= g;
    const key = [x, y].join(",");
    vectorObj[key] = vectorObj[key] ? vectorObj[key] + 1 : 1;
  }
  for (let key of Object.keys(vectorObj)) {
    const [x, y] = key.split(",");
    const newKey = [-1 * y, x].join(",");
    if (vectorObj[newKey]) {
      total += vectorObj[newKey] * vectorObj[key];
    }
  }
};

const solution = () => {
  n = Number(input.shift());

  input = input.map((el) => el.split(" ").map(Number));

  for (let i = 0; i < n; i++) {
    cal(i);
  }
  console.log(total);
};

solution();

// 시간 초과
// const calDist = (pos1, pos2) =>
//   (pos1[0] - pos2[0]) ** 2n + (pos1[1] - pos2[1]) ** 2n;

// const check = (pos1, pos2, pos3) => {
//   const d1 = calDist(pos1, pos2);
//   const d2 = calDist(pos1, pos3);
//   const d3 = calDist(pos2, pos3);
//   if (d1 + d2 == d3 || d2 + d3 == d1 || d1 + d3 == d2) return true;
//   return false;
// };

// const solution = () => {
//   const n = Number(input.shift());
//   input = input.map((el) => el.split(" ").map((num) => BigInt(num)));
//   let result = 0;
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       for (let k = j + 1; k < n; k++) {
//         if (check(input[i], input[j], input[k])) result++;
//       }
//     }
//   }
//   console.log(result);
// };

// solution();
