// 정확성 O , 효율성 x
function sol1(n, stations, w) {
  let answer = 0;
  const v = Array.from({ length: n + 1 }, () => false);
  stations.forEach((station) => {
    let init = station - w < 0 ? 0 : station - w;
    let last = station + w > n ? n : station + w;
    for (let i = init; i <= last; i++) {
      v[i] = true;
    }
  });

  for (let i = 1; i <= n; i++) {
    if (v[i]) continue;
    else {
      answer++;
      let init = i;
      let last = i + 2 * w > n ? n : i + 2 * w;
      for (let j = init; j <= last; j++) {
        v[j] = true;
      }
    }
  }

  return answer;
}

// 정확성 O, 효율성 ㅒ
function solution(n, stations, w) {
  let answer = 0;
  let width = 1 + 2 * w;
  let stationIdx = 0;
  let i = 1;

  while (i <= n) {
    if (i >= stations[stationIdx] - w && i <= stations[stationIdx] + w) {
      // 현 위치가 미리 설치된 기지국의 전파를 받는 곳이면
      // 전파가 미치는 마지막 위치로 이동한다.
      i = stations[stationIdx] + w + 1;
      stationIdx++;
    } else {
      // 현 위치에 전파가 없다면 현 위치를 마지막 전파가 닿는 위치가 되도록
      // 현 위치 + width 위치에 기지국을 세운다.
      i += width;
      answer++;
    }
  }
  return answer;
}
