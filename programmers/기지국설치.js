function solution(n, stations, w) {
  var answer = 0;

  // 정확성은 맞으나 메모리 초과나옴 그냥 배열 자체를 만들지 말고 반복문에서 조건으로 index이동하는게 좋아보임
  // const arr = Array.from({ length: n }, () => false);
  // stations.forEach((station) => {
  //   for (let start = -w; start <= w; start++) {
  //     arr[start + station - 1] = true;
  //   }
  // });

  let stationIdx = 0;
  let stationRange = [stations[stationIdx] - w, stations[stationIdx] + w];
  for (let i = 1; i <= n; i++) {
    if (i >= stationRange[0] && i <= stationRange[1]) {
      i = stationRange[1];
      stationIdx++;
      stationRange = [stations[stationIdx] - w, stations[stationIdx] + w];
    } else {
      answer++;
      i += 2 * w;
    }
  }
  return answer;
}

solution(11, [4, 11], 1);
