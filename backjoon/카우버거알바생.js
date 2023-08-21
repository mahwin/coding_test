// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `4 3 4
2 5
1 2
3 3
2 1`
  .split("\n")
  .map((el) => el.split(" ").map(Number));

// 냅색 문제인데 고려해야할 값이 2개 일뿐
const solution = () => {
  // [주문 번호][햄버거,감자]
  const [n, ham, potato] = input[0];

  const dp = Array.from({ length: 101 }, () =>
    Array.from({ length: 301 }, () => Array.from({ length: 301 }, () => 0))
  );

  for (let i = 1; i <= n; i++) {
    const [needHam, needPota] = input[i];
    for (let j = 1; j <= 300; j++) {
      for (let k = 1; k <= 300; k++) {
        if (needHam <= j && needPota <= k) {
          dp[i][j][k] = Math.max(
            1 + dp[i - 1][j - needHam][k - needPota],
            dp[i - 1][j][k]
          );
        } else {
          dp[i][j][k] = dp[i - 1][j][k];
        }
      }
    }
  }
  console.log(dp[n][ham][potato]);
};

solution();
