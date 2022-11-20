function solution(distance, scope, times) {
  //제일 가까운 병사들과 그 병사들의 시간을 한 배열로
  const scopeWithTimes = scope.map((s, idx) => {
    s = s.sort((a, b) => a - b);
    return [...s, ...times[idx]];
  });
  const sortedArr = scopeWithTimes.sort((a, b) => a[0] - b[0]);

  for (let element of sortedArr) {
    const [dist1, dist2, work, rest] = element;
    const offset = work + rest;
    for (let x = dist1; x <= dist2; x++) {
      const discrimination = x % offset;
      if (discrimination !== 0 && discrimination <= work) return x;
    }
  }
  return distance;
}
