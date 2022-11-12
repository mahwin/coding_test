function solution(k, m, score) {
  let answer = 0;
  score.sort((a, b) => b - a);
  let idx = m;
  while (true) {
    if (score[idx - 1]) {
      answer += score[idx - 1] * m;
    } else {
      break;
    }
    idx += m;
  }
  return answer;
}
