// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `5
7
7
7
7
7`
  .split("\n")
  .map(Number);

let dp;
let result = 0;

const dfs = (a, b, c, d, e, pre, pre_pre) => {
  //사용할 구슬이 없으면 종료
  // if ([a, b, c, d, e].join("") === "00000") return 1;
  if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0) return 1;
  let tmp = dp[a][b][c][d][e][pre][pre_pre];
  // 0이 아니란건 돌았단 표시
  if (tmp != 0) return tmp;

  tmp = 0;
  // 남아 있는 비즈가 있고 전과 전전이 그 색의 비즈를 사용 안 했다면
  // 전에 선택했던 비즈가 전전이 됨 pre => pre_pre
  if (a > 0 && pre != 1 && pre_pre != 1) tmp += dfs(a - 1, b, c, d, e, 1, pre);
  if (b > 0 && pre != 2 && pre_pre != 2) tmp += dfs(a, b - 1, c, d, e, 2, pre);
  if (c > 0 && pre != 3 && pre_pre != 3) tmp += dfs(a, b, c - 1, d, e, 3, pre);
  if (d > 0 && pre != 4 && pre_pre != 4) tmp += dfs(a, b, c, d - 1, e, 4, pre);
  if (e > 0 && pre != 5 && pre_pre != 5) tmp += dfs(a, b, c, d, e - 1, 5, pre);
  dp[a][b][c][d][e][pre][pre_pre] = tmp;
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

  console.time("측정");
  result += dfs(...balls.slice(1), 0, 0);
  console.log(result);
  console.timeEnd("측정");
};

solution();

// 노드로 맞춘 사람이 없음 ... ?
