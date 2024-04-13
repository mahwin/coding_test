function solution(strs, t) {
  const dp = Array.from({ length: t.length + 1 }, () => Infinity);

  for (let i = 0; i < t.length; i++) {
    for (const str of strs) {
      if (t.slice(i, i + str.length) === str) {
        dp[i - 1 + str.length] = Math.min(
          dp[i - 1 + str.length],
          (dp[i - 1] || 0) + 1
        );
      }
    }
  }
  return dp[t.length - 1] === Infinity ? -1 : dp[t.length - 1];
}

solution(["ba", "na", "n", "a"], "banana");
