function solution(sequence) {
  let answer = Math.max(sequence[0], -sequence[0]);
  const dpPositive = [];
  const dpNegative = [];

  for (let i = 0; i < sequence.length; i++) {
    const num = sequence[i];
    if (i == 0) {
      dpPositive.push(num);
      dpNegative.push(-num);
      continue;
    }
    if (i % 2 === 0) {
      dpPositive.push(Math.max(dpPositive[i - 1] + num, num));
      dpNegative.push(Math.max(dpNegative[i - 1] - num, -num));
    } else {
      dpPositive.push(Math.max(dpPositive[i - 1] - num, -num));
      dpNegative.push(Math.max(dpNegative[i - 1] + num, num));
    }
    answer = Math.max(answer, dpPositive[i], dpNegative[i]);
  }

  return answer;
}

const gen = (num) => {
  let result = [];

  for (let i = 0; i < num; i++) {
    result.push(Math.floor(Math.random() * 100));
  }
  return result;
};
