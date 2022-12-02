function solution(routes) {
  let answer = 0;
  let camPosition = -Infinity;
  routes.sort((a, b) => a[1] - b[1]);

  routes.forEach(([start, end]) => {
    if (camPosition < start) {
      camPosition = end;
      answer++;
    }
  });
  return answer;
}
