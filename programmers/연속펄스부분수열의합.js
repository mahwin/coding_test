function solution(sequence) {
  let answer = -Infinity;
  const dp = { "+": [-Infinity], "-": [-Infinity] };
  // dp['+'] 짝수마다 + 홀수는 -
  // dp['-'] 짝수마다 - 홀수는 +
  sequence.forEach((num, i) => {
    if (i % 2) {
      //짝수
      dp["+"].push(Math.max(dp["+"][i] + num, num));
      dp["-"].push(Math.max(dp["-"][i] - num, -num));
    } else {
      dp["+"].push(Math.max(dp["+"][i] - num, -num));
      dp["-"].push(Math.max(dp["-"][i] + num, num));
    }
    answer = Math.max(dp["+"].at(-1), dp["-"].at(-1), answer);
  });

  return answer;

  // 이렇게 하면 메모리 초과 나옴.. 그냥 파이프라인 한 번 돌때 Max값도 점진적으로 계산하자.
  //   const pM = Math.max(...dp["+"]);
  //   const mM = Math.max(...dp["-"]);
  //   return pM > mM ? pM : mM;
}
