// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `4
1
1
1
1`
  .split("\n")
  .map(Number);

let dp;

const dfs = (a, b, c, d, e, pre, pre_pre) => {
  if ([a, b, c, d, e].join("") === "000000") return 1;
  let tmp = dp[a][b][c][d][e][pre][pre_pre];
  if (tmp != -1) return tmp;
  if (tmp === 0) return tmp;

  tmp = 0;
  //남아 있는 비즈가 있고 전과 전전이 그 색의 비즈를 사용 안 했다면
  if (a > 0 && pre != 1 && pre_pre != 1)
    tmp += dfs(a - 1, b, c, d, e, 1, pre_pre);
  if (b > 0 && pre != 2 && pre_pre != 2)
    tmp += dfs(a, b - 1, c, d, e, 2, pre_pre);
  if (c > 0 && pre != 3 && pre_pre != 3)
    tmp += dfs(a, b, c - 1, d, e, 3, pre_pre);
  if (a > 0 && pre != 4 && pre_pre != 4)
    tmp += dfs(a, b, c, d - 1, e, 4, pre_pre);
  if (a > 0 && pre != 5 && pre_pre != 5)
    tmp += dfs(a - 1, b, c, d, e - 1, 5, pre_pre);
  return tmp;
};

const solution = () => {
  const n = input[0];
  //총 5개의 공에 전과 전전에 뭘 선택했는지만 의미 있음

  // dp[11][11][11][11][11][6][6]
  // 1~5차원은 각 구슬의 수, 총 10까지
  // 6,7차원은 바로 전과 전전의 구슬 색, 총 5가지
  dp = Array.from({ length: 11 }, () =>
    Array.from({ length: 11 }, () =>
      Array.from({ length: 11 }, () =>
        Array.from({ length: 11 }, () =>
          Array.from({ length: 11 }, () =>
            Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => 0))
          )
        )
      )
    )
  );
  const balls = Array.from({ length: 6 }, () => 0);
  for (let i = 1; i <= n; i++) {
    balls[i] = input[i];
  }
  result = dfs(...balls.slice(1), 0, 0);
  console.log(result);
};

solution();
