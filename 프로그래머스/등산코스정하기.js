function solution(n, paths, gates, summits) {
  const submmitSet = new Set([...summits]);

  const len = n + 1;
  summits.sort((a, b) => a - b);

  const graph = Array.from({ length: len }, () => []);

  paths.forEach(([from, to, intense]) => {
    graph[from].push([to, intense]);
    graph[to].push([from, intense]);
  });

  let result = [Infinity, Infinity];

  // route, 산봉오리 방문 여부, 여태 쌓은 intensity,
  const bfs = (maxIntensity) => {
    const v = Array.from({ length: len }, () => 0);
    gates.forEach((gate) => (v[gate] = 1));

    const q = [...gates];

    while (q.length) {
      const node = q.shift();
      for (const [next, curInten] of graph[node]) {
        if (v[next]) continue;
        if (maxIntensity < curInten) continue;
        v[next] = 1;
        if (submmitSet.has(next)) continue;
        q.push(next);
      }
    }

    for (const summit of summits) {
      if (v[summit]) return summit;
    }
  };

  let left = 0;
  let right = 10_000_000;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const res = bfs(mid);
    if (res) {
      result = [res, mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}
