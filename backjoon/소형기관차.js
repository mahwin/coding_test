let input = `7
35 40 50 10 30 45 60
2`.split("\n");

const solution = () => {
  let LEN = +input.shift();
  const TRAIN_LEN = +input.pop();
  input = [0, ...input[0].split(" ").map(Number)];

  const accArr = Array.from({ length: LEN + 1 }, () => 0);

  let acc = 0;
  for (let i = 1; i <= LEN; i++) {
    acc += input[i];
    if (i >= TRAIN_LEN) {
      acc -= input[i - TRAIN_LEN];
      accArr[i - TRAIN_LEN + 1] = acc;
    }
  }

  const dp = Array.from({ length: 4 }, () =>
    Array.from({ length: LEN + 1 }, () => 0)
  );

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= LEN; j++) {
      dp[i][j] = accArr[j] + (dp[i - 1][j - TRAIN_LEN] || 0);
    }

    let max = 0;
    dp[i].forEach((el, idx) => {
      max = Math.max(el, max);
      dp[i][idx] = max;
    });
  }
  console.log(dp[3][LEN]);
};

solution();
