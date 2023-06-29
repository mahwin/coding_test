const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `4
2`.split("\n");

// 1번과 마지막이 둘 다 색칠되는 경우를 제외하고는 선형임!!
// dp[n][k] = n개의 색상환 중 k개의 색을 인접하지 않게 고르기.

const solution = () => {
  const DIV = 1_000_000_003;
  const [n, k] = input.map(Number);
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => null)
  );
  // dp 배열에 기본값 채우기
  for (let i = 0; i < n; i++) {
    dp[i][1] = i;
    dp[i][0] = 1;
  }

  // n번 색의 경우의 수는 n번째 색을 선택할 경우와 선택하지 않을 경우로 나뉨
  // dp[n][k] = dp[n-2][k-1] + dp[n-1][k]
  // dp[n-2][k-1]은 현재 색을 선택할 거니 n-1은 선택못함 그래서 n-2에 현재 색을 선택할 거니 선택수 k-1
  // dp[n-1][k]은 현재 색을 선택하지 않을거니 바로전 n-1에 k

  for (let i = 2; i <= n; i++) {
    for (let j = 1; 2 * j <= i + 1; j++) {
      dp[i][j] = (dp[i - 2][j - 1] + dp[i - 1][j]) % DIV;
    }
  }
  // 환형에 대한 생각 첫 번째 색을 고른다고 생각하면 첫 번째 색의 바로 옆과 마지막은 환형이라 선택할 수 없음 => dp[n-3][k-1]이랑 같음
  // 첫 번째 색을 고르지 않는다고 생각하면 dp[n-1][k]임
  return (dp[n - 3][k - 1] + dp[n - 1][k]) % DIV;
};

console.log(solution());
