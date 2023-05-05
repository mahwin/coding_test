// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `8 5
-2 3 5 -6 10 -8 7 6
3 5 2 7 7`.split("\n");

const parser = (info) => info.split(" ").map(Number);

const solution = () => {
  let result = "";
  const [n, q] = parser(input[0]); // n 소의 수, q 장난친 횟 수
  const cows = parser(input[1]);
  cows.push(...cows.slice(0, 3));

  const info = []; //한 마리의 소가 영양을 미치는 값 저장
  for (let i = 0; i < n; i++) {
    info.push(cows[i] * cows[i + 1] * cows[i + 2] * cows[i + 3]);
  }

  const filpIdx = parser(input[2]);
  let sum = info.reduce((p, c) => (p += c));

  filpIdx.forEach((idx) => {
    for (let i = 0; i < 4; i++) {
      // 인덱스 보정  -4 => -1은 소가 0부터 시작
      // -3은 현재 인덱스를 가진 소가 영향을 미치는 인덱스가 현재 인덱스보다 3개 전 부터 자기자신까지.
      let k = (idx - 4 + i + n) % n;
      info[k] *= -1;
      sum += 2 * info[k];
    }

    result += sum + "\n";
  });
  console.log(result.trim());
};

solution();

// 값 나올 떄마다 console.log로 찍었는데 전체 값을 받아서 해결
