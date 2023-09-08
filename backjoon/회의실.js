const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const strToNumArr = (str) =>
  str.split(" ").map((numString) => Number(numString));

function solution() {
  const N = Number(input.shift());
  const schedule = input
    .map((str) => strToNumArr(str))
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

  let result = 0,
    recentEnd = 0;
  schedule.forEach(([start, end]) => {
    //전에 진행된 회의가 끝나기 전에 시작되면 다음으로
    if (start < recentEnd) {
      return;
    }
    //아니면 진행
    result++;
    recentEnd = end;
  });

  return result;
}

console.log(solution());
