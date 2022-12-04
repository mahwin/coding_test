function solution(land) {
  var answer = 0;

  let dp = Array.from({ length: land.length }, () => [0, 0, 0, 0]);
  dp[0] = land[0];

  let idxArr = [0, 1, 2, 3];
  let idxObj = {};
  idxArr.forEach((idx) => {
    idxObj[idx] = idxArr.filter((i) => i !== idx);
  });

  for (let i = 1; i < land.length; i++) {
    for (let j = 0; j < 4; j++) {
      let values = dp[i - 1].filter((_, k) => k !== j);
      dp[i][j] = Math.max(Math.max(...values) + land[i][j], dp[i - 1][j]);
    }
  }

  return Math.max(...dp[dp.length - 1]);
}

solution([
  [1, 2, 3, 5],
  [5, 6, 7, 8],
  [4, 3, 2, 1],
]);
