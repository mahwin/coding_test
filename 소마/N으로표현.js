function solution(N, number) {
  const dp = Array.from({ length: 10 }, () => []);
  dp[1] = [N];

  for (let i = 1; i < 9; i++) {
    let set = new Set();
    set.add(Number(String(N).repeat(i)));
    for (let k = 1; k < i; k++) {
      dp[k].forEach((str1) => {
        dp[i - k].forEach((str2) => {
          if (str2 !== 0) {
            set.add(str1 + str2);
            set.add(str1 - str2);
            set.add(Math.floor(str1 / str2));
            set.add(Math.floor(str1 * str2));
          }
        });
      });
    }
    if (set.has(number)) return i;
    dp[i] = [...set];
  }
  return -1;
}
