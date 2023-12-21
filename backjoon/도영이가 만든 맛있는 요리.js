const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `1
3 10`.split("\n");

function solution() {
  const N = parseInt(input.shift(), 10);
  input = input.map((el) => el.split(" ").map(Number));
  let result = Math.abs(input[0][0] - input[0][1]);

  const backtracking = (mul, sum, nextIdx, cnt) => {
    if (cnt > 0) {
      result = Math.min(result, Math.abs(mul - sum));
    }
    if (N === nextIdx) return;
    backtracking(
      mul * input[nextIdx][0],
      sum + input[nextIdx][1],
      nextIdx + 1,
      cnt + 1
    );
    backtracking(mul, sum, nextIdx + 1, cnt);
  };
  backtracking(1, 0, 0, 0);

  return result;
}

console.log(solution());

// const factorial = () => {
//   let result = 1;
//   for (let i = 1; i < 10; i++) {
//     result = result * i;
//   }
//   console.log(result);
// };

// factorial();
