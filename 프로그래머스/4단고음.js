function solution(n) {
  let result = 0;
  const dfs = (n, cnt) => {
    if (n < 3) return;
    if (n === 3 && cnt === 2) {
      result++;
      return;
    }
    if (n % 3 === 0 && cnt >= 2) {
      dfs(n / 3, cnt - 2);
    }

    dfs(n - 1, cnt + 1);
  };

  dfs(n, 0);
  return result;
}

console.log(solution(2147483647));
