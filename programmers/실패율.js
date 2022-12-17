function solution(N, stages) {
  let answer = Array.from({ length: N + 1 }, () => [0, 0]);
  for (let stage of stages) {
    for (let i = 1; i <= N; i++) {
      if (stage > i) {
        answer[i][0] += 1;
        answer[i][1] += 1;
      } else if (stage === i) answer[i][1] += 1;
    }
  }

  answer = answer.map(([success, trial]) => {
    if (trial === 0) return 0;
    fail = trial - success;
    return fail / trial;
  });

  const result = [];
  answer.shift();

  for (let target of [...new Set([...answer])].sort((a, b) => b - a)) {
    for (let i = 0; i < answer.length; i++) {
      if (target === answer[i]) result.push(i + 1);
    }
  }

  return result;
}

solution(4, [1, 1, 1, 1, 1, 1, 1, 1]);
