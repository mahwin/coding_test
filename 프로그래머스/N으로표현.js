function cal(num1, num2) {
  return [num1 + num2, num1 - num2, num1 * num2, Math.floor(num1 / num2)];
}

function isInArr(target, arr) {
  return arr.includes(target);
}

function repeatNum(str, repeatN) {
  return Number(`${str}`.repeat(repeatN));
}

function solution(N, number) {
  if (N === number) return 1;

  const dp = Array.from({ length: 10 }, () => []);

  for (let i = 1; i <= 8; i++) {
    let set = new Set();
    for (let j = 1; j < i; j++) {
      const k = i - j;
      for (const num1 of dp[j]) {
        for (const num2 of dp[k]) {
          const calResult = cal(num1, num2);
          if (isInArr(number, calResult)) return i;
          calResult.forEach((el) => set.add(el));
        }
      }
    }
    if (repeatNum(N, i) === number) return i;
    dp[i] = [repeatNum(N, i), ...set];
  }
  return -1;
}
