function solution(n, results) {
  const win = {};
  const lose = {};

  results.forEach(([a, b]) => {
    win[a] = win[a] ? win[a].concat(b) : [b];
    lose[b] = lose[b] ? lose[b].concat(a) : [a];
  });

  const bfs = (node, graph) => {
    let cnt = 0;
    const v = Array.from({ length: n + 1 }, () => false);
    v[node] = true;
    const queue = [[node]];
    while (queue.length) {
      const n = queue.shift();

      if (!graph[n]) continue;
      for (const next of graph[n]) {
        if (v[next]) continue;
        cnt++;
        v[next] = true;
        queue.push([next]);
      }
    }
    return cnt;
  };
  let result = 0;
  for (let node = 1; node <= n; node++) {
    const w = bfs(node, win);
    const l = bfs(node, lose);

    if (l + w + 1 === n) result++;
  }
  return result;
}
