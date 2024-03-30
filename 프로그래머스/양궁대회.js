function solution(n, info) {
  let result = [];
  const ryan = new Array(11).fill(0);
  let score = 0;

  const dfs = (remain, targetIdx) => {
    if (remain === 0) {
      const currentScore = cal(info, ryan);
      if (score < currentScore) {
        score = currentScore;
        result = [...ryan];
      }
      return;
    }

    if (targetIdx === -1) return;

    for (let i = remain; i >= 0; i--) {
      ryan[targetIdx - 1] = i;
      dfs(remain - i, targetIdx - 1);
      ryan[targetIdx - 1] = 0;
    }
  };

  dfs(n, 11);
  return result.length === 0
    ? [-1]
    : result.concat(new Array(11 - result.length).fill(0));
}

function cal(appeach, ryan) {
  let score = 0;
  for (let i = 0; i < 10; i++) {
    if (!appeach[i] && !ryan[i]) continue;
    if (appeach[i] >= (ryan[i] || 0)) score -= 10 - i;
    else score += 10 - i;
  }

  return score;
}
