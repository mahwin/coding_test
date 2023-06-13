function solution(N, stages) {
  const countArr = Array.from({ length: N + 2 }, () => 0);
  const failRate = Array.from({ length: N + 2 }, (_, i) => [0, i]);
  stages.forEach((stage) => countArr[stage]++);

  let people = countArr[N + 1];
  for (let i = N; i >= 1; i--) {
    people += countArr[i];
    // people가 0이면 NaN이 나옴 => 아무도 시도 안 했으면 실패율 0
    failRate[i][0] = Number.isNaN(countArr[i] / people)
      ? 0
      : countArr[i] / people;
  }
  return failRate
    .slice(1, N + 1)
    .sort((a, b) => {
      if (a[0] == b[0]) return a[1] - b[1];
      else return b[0] - a[0];
    })
    .map((el) => el[1]);
}
