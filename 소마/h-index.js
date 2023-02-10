function solution(citations) {
  citations.sort((a, b) => b - a);

  let max = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      max = Math.max(max, i + 1);
    }
  }
  return max;
}
