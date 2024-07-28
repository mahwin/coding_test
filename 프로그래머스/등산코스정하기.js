// overflow가 발생함
function solution(n, paths, gates, summits) {
  const gateSet = new Set(gates);
  const summitSet = new Set(summits);

  const graph = {};
  const v = Array.from({ length: n + 1 }, () => false);

  paths.forEach(([a, b, intensity]) => {
    if (graph[a]) graph[a].push([b, intensity]);
    else graph[a] = [[b, intensity]];

    if (graph[b]) graph[b].push([a, intensity]);
    else graph[b] = [[a, intensity]];
  });

  let result = { intensity: Infinity, summits: n };

  gates.forEach((gate) => {
    const { minIntensity, summits } = search(gate, graph, v, result.intensity);
    if (result.intensity > minIntensity) {
      result.summits = summits;
      result.intensity = minIntensity;
    } else if (result.intensity == minIntensity && result.summits > summits) {
      result.summits = summits;
    }
  });

  function search(startNode, graph, v, startIntensity) {
    let minIntensity = startIntensity;
    let summits = Infinity;

    function dfs(node, intensity) {
      if (summitSet.has(node)) {
        if (minIntensity > intensity) {
          minIntensity = intensity;
          summits = node;
        } else if (minIntensity === intensity && summits > node) {
          summits = node;
        }

        return;
      }

      for (const [nextNode, nextInten] of graph[node]) {
        if (gateSet.has(nextNode) || v[nextNode]) continue;
        if (nextInten > minIntensity) continue;
        v[nextNode] = true;
        dfs(nextNode, Math.max(nextInten, intensity));
        v[nextNode] = false;
      }
    }
    dfs(startNode, 0);

    return { minIntensity, summits };
  }
  return [result.summits, result.intensity];
}
