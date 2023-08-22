const fs = require("fs");
// let input = Number(fs.readFileSync("/dev/stdin").toString());

const solution = () => {
  // 화면에 있는 이모티콘을 모두 복사해서 클립보드에 저장한다.
  // 클립보드에 있는 모든 이모티콘을 화면에 붙여넣기 한다.
  // 화면에 있는 이모티콘 중 하나를 삭제한다.

  // dp 초기값은 이모티콘을 하나씩 증가시켜 넣을 경우의 수를 기준으로
  const dp = Array.from({ length: 1000 + 3 }, (_, i) => i);
  dp[1] = 0;
  dp[2] = 2;

  for (let i = 2; i < input + 1; i++) {
    let j = 2;
    while (i * j <= 1002) {
      dp[i * j] = Math.min(dp[i * j], dp[i] + j);
      dp[i * j - 1] = Math.min(dp[i * j - 1], dp[i * j] + 1);
      j++;
    }
  }
  console.log(dp);
  return dp[input];
};
input = 18;
console.log(solution());
