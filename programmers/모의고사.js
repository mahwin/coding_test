function solution(answers) {
  const answer1 = [1, 2, 3, 4, 5];
  const answer2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const answer3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const scores = [0, 0, 0];

  answers.forEach((num, i) => {
    if (num == answer1[i % answer1.length]) scores[0]++;
    if (num == answer2[i % answer2.length]) scores[1]++;
    if (num == answer3[i % answer3.length]) scores[2]++;
  });
  const maxScore = Math.max(...scores);
  const result = [];

  scores.forEach((s, i) => (maxScore == s ? result.push(i + 1) : null));
  return result;
}
