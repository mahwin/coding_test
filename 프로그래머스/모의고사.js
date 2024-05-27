const type = {
  one: [1, 2, 3, 4, 5],
  two: [2, 1, 2, 3, 2, 4, 2, 5],
  three: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
};

function solution(answers) {
  let [oneI, twoI, threeI] = [0, 0, 0];
  const score = [0, 0, 0];

  for (const answer of answers) {
    if (type["one"][oneI] === answer) score[0]++;
    if (type["two"][twoI] === answer) score[1]++;
    if (type["three"][threeI] === answer) score[2]++;

    oneI = oneI + 1 === type["one"].length ? 0 : oneI + 1;
    twoI = twoI + 1 === type["two"].length ? 0 : twoI + 1;
    threeI = threeI + 1 === type["three"].length ? 0 : threeI + 1;
  }
  const maxScore = Math.max(...score);
  return score
    .map((s, i) => [s, i + 1])
    .filter(([s, _]) => s === maxScore)
    .map((el) => el[1]);
}
