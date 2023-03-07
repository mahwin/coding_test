function solution(n, m, x, y, queries) {
  let xt = (xb = x),
    yl = (yr = y);
  queries = queries.reverse();

  for (let q of queries) {
    const [cmd, v] = q;
    if (cmd === 0) {
      // 우로 열 확장
      if (yl > 0) yl += v;
      yr = Math.min(yr + v, m - 1);
    } else if (cmd === 1) {
      // 좌로 열 확장
      if (yr < m - 1) yr -= v;
      yl = Math.max(yl - v, 0);
    } else if (cmd === 2) {
      // 아래로 행 확장
      if (xt > 0) xt += v;
      xb = Math.min(xb + v, n - 1);
    } else {
      // 위로 행 확장
      if (xb < n - 1) xb -= v;
      xt = Math.max(xt - v, 0);
    }

    if (xt > n - 1 || xb < 0 || yl > m - 1 || yr < 0) return 0;
  }

  return (xb - xt + 1) * (yr - yl + 1);
}
