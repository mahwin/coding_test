const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let target; // 배열의 합
let ALength, BLength; // 각 배열의 길이
let A, B; // 각 배열

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  console.log(solution());
  process.exit();
});

const bs = (findNum) => {
  let [l, r] = [0, BLength - 1];

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (B[mid] > findNum) {
      r = mid - 1;
    } else if (B[mid] < findNum) {
      l = mid + 1;
    } else return true;
  }
  return false;
};

const solution = () => {
  let result = 0;
  target = Number(input.shift());
  ALength = Number(input.shift());
  A = input.shift().split(" ").map(Number);
  BLength = Number(input.shift());
  B = input.shift().split(" ").map(Number);
  const sumMap = new Map();

  for (let i = 0; i < ALength; i++) {
    let sum = 0;
    for (let j = i; j < ALength; j++) {
      sum += A[j];
      sumMap.set(sum, (sumMap.get(sum) ?? 0) + 1);
    }
  }

  for (let i = 0; i < BLength; i++) {
    let sum = 0;
    for (let j = i; j < BLength; j++) {
      sum += B[j];
      if (sumMap.has(target - sum)) result += sumMap.get(target - sum);
    }
  }

  return result;
};
