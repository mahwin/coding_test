function solution(n, wires) {
  const graph = {};
  let result = n;

  for (const [a, b] of wires) {
    if (graph[a]) graph[a].push(b);
    else graph[a] = [b];
    if (graph[b]) graph[b].push(a);
    else graph[b] = [a];
  }

  const link = (node, disNode) => {
    let visited = Array.from({ length: n + 1 }, () => false);
    let cnt = 1;
    visited[node] = true;

    const queue = [node];

    while (queue.length) {
      const curNode = queue.shift();

      for (const nextNode of graph[curNode]) {
        if (visited[nextNode]) continue;
        if (disNode === nextNode) continue;
        visited[nextNode] = true;
        queue.push(nextNode);
        cnt++;
      }
    }
    return cnt;
  };

  for (const [startNode, disabledNode] of wires) {
    const linkedCnt = link(startNode, disabledNode);
    const diff = Math.abs(n - linkedCnt - linkedCnt);
    console.log(diff);
    result = Math.min(diff, result);
  }

  return result;
}
