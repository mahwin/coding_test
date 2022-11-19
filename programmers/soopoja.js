function solution(answers) {
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let scores = [0, 0, 0];
  answers.forEach((answer, idx) => {
    if (answer === one[idx % 5]) scores[0]++;
    if (answer === two[idx % 8]) scores[1]++;
    if (answer === three[idx % 10]) scores[2]++;
  });
  const maxScore = Math.max(...scores);
  console.log(scores);
  let answer = [];
  scores.forEach((score, idx) => {
    if (score === maxScore) answer.push(idx + 1);
  });
  return answer;
}

solution([1, 2, 5, 5, 2]);
