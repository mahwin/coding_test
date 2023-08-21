const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

function solution(input) {
  const n = +input.shift();
  input = input[0]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let result = Infinity;
  for (let l = 0; l < n; l++) {
    for (let r = l + 3; r < n; r++) {
      const snowHeight = input[r] + input[l];
      let [i, j] = [l + 1, r - 1];
      while (i < j) {
        const diff = snowHeight - input[j] - input[i];
        result = Math.min(result, Math.abs(diff));
        if (diff > 0) i++;
        else if (diff < 0) j--;
        else return 0;
      }
    }
  }
  return result;
}

console.log(solution(input));
