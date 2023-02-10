function solution(answers) {
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const scores = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    let num = answers[i];
    if (one[i % 5] === num) scores[0]++;
    if (two[i % 8] === num) scores[1]++;
    if (three[i % 10] === num) scores[2]++;
  }
  let answer = [];
  let max = -Infinity;
  for (let i = 1; i < 4; i++) {
    if (max < scores[i - 1]) {
      answer = [i];
      max = scores[i - 1];
    } else if (max === scores[i - 1]) answer.push(i);
  }
  return answer;
}
