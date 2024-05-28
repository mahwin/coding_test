function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);

  let cur = -Infinity;
  let result = 0;

  for (const [start, end] of routes) {
    if (cur >= start) continue;

    if (cur < end) {
      cur = end;
      result++;
    }
  }

  return result;
}
