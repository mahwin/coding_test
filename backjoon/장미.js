const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

// let input = `22 2 3 10 14`;

const solution = () => {
  let [n, aC, bP, cC, dP] = input.split(" ").map(Number);

  // aC,bP가 가성비 좋은 셋트로 고정
  if (bP / aC < dP / cC) {
    [aC, bP, cC, dP] = [cC, dP, aC, bP];
  }

  let result = Infinity;
  for (let i = 0; i < cC; i++) {
    let idx = Math.ceil((n - i * aC) / cC);
    result = Math.min(result, i * bP + idx * dP);
    if (idx <= 0) break;
  }
  return result;
};

console.log(solution());
