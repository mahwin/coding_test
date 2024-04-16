function solution(N, number) {
  let dp = Array.from({ length: 9 }, () => []);

  for (let i = 1; i < 9; i++) {
    const NN = Number(N.toString().padStart(i, N.toString()));
    let set = new Set();
    set.add(NN);

    for (let j = i - 1; j >= 1; j--) {
      const k = i - j;

      dp[j].forEach((a) => {
        dp[k].forEach((b) => {
          set.add(a + b);
          set.add(a - b);
          set.add(Math.floor(a / b));
          set.add(a * b);
        });
      });
    }

    if (set.has(number)) return i;
    dp[i] = [...set];
  }

  return -1;
}
