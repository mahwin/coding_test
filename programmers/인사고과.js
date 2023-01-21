const sumScore = (score) => {
  return score[0] + score[1];
};

function solution(scores) {
  let wanho = sumScore(scores[0]);
  let newScores = [scores[0]];

  scores.forEach((el) => {
    if (wanho < sumScore(el)) {
      newScores.push(el);
    }
  });

  let result = [];

  for (let i = 0; i < newScores.length; i++) {
    let flag = true;
    for (let j = 0; j < newScores.length; j++) {
      if (
        newScores[i][0] < newScores[j][0] &&
        newScores[i][1] < newScores[j][1]
      ) {
        if (i === 0) return -1;
        flag = false;
        break;
      }
    }
    if (flag) result.push(i);
  }
  return result.length;
}

console.log(
  solution([
    [2, 2],
    [1, 4],
    [3, 2],
    [3, 2],
    [2, 1],
  ])
);
