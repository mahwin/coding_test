// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `6 60
5
1 2 30
2 5 70
5 6 60
3 4 40
1 6 40`.split("\n");

function solution() {
  const [N, M] = input[0].split(" ").map(Number);
  const cases = Number(input[1]);

  let result = 0;

  input = input.slice(2).map((v) => v.split(" ").map(Number));
  input = input.filter((el) => el[0] < el[1]);
  input.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else return a[1] - b[1];
  });

  const ca = Array.from({ length: N + 1 }, () => 0);

  input.forEach(([start, end, cost]) => {
    let cnt = 0;
    for (let i = start; i < end; i++) {
      cnt = Math.max(cnt, ca[i]);
      if (cnt >= M) break;
    }

    if (cnt < M) {
      let canPack = M - cnt;
      canPack = Math.min(canPack, cost);
      result += canPack;
      for (let i = start; i < end; i++) {
        ca[i] += canPack;
      }
    }
  });
  return result;
}

console.log(solution());
