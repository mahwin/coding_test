function solution(N, stages) {
  // 해당 스테이지를 시도하고 있는 사람 정보
  const stageArr = Array.from({ length: N + 1 }, () => 0);

  stages.forEach((stage) => {
    stageArr[stage - 1]++;
  });

  // i번째 스테이지를 시도하고 있다? i-1...1 번째 스테이지를 완료했다는 의미
  // 누적합으로 더하고 뒤집어 주자
  let stageTrialArr = [...stageArr];

  for (let i = N - 1; i >= 0; i--) {
    stageTrialArr[i] += stageTrialArr[i + 1];
  }

  const unSuccessArr = [];

  for (let stage = 0; stage < N; stage++) {
    if (stageTrialArr[stage] === 0) {
      unSuccessArr[stage] = [0, stage + 1];
      continue;
    }

    unSuccessArr[stage] = [stageArr[stage] / stageTrialArr[stage], stage + 1];
  }
  return unSuccessArr.sort((a, b) => b[0] - a[0]).map((el) => el[1]);
}
