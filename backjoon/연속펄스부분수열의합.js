function solution(sequence) {
  let result = Math.abs(sequence[0]);
  const positive = [sequence[0]];
  const negative = [-sequence[0]];

  for (let i = 1; i < sequence.length; i++) {
    const num = sequence[i];
    if (i % 2 === 0) {
      // 짝수 번째니까 positive + negative -
      positive.push(Math.max(positive[i - 1] + num, num));
      negative.push(Math.max(negative[i - 1] - num, -num));
    } else {
      // 홀수니까 po - nega +
      positive.push(Math.max(positive[i - 1] - num, -num));
      negative.push(Math.max(negative[i - 1] + num, num));
    }
    result = Math.max(result, positive[i], negative[i]);
  }

  return result;
}
