function solution(n, paths, gates, summits) {
  const pathInfo = Array.from({ length: n + 1 }, () => []);
  paths.forEach(([i, j, w]) => {
    pathInfo[i].push([j, w]);
    pathInfo[j].push([i, w]);
  });

  const distance = Array.from({ length: n + 1 }, () => Infinity);
  const pq = [];
  for (const gate of gates) {
    pq.push([0, gate]); //[강도, 노드]
  }

  while (pq.length > 0) {
    const intensArr = pq.map((el) => el[0]);

    const smallIdx = intensArr.indexOf(Math.min(...intensArr));
    const [intensity, node] = pq[smallIdx];
    console.log(pq);
    pq.splice(smallIdx, 1);
    console.log(pq);
    if (distance[node] <= intensity) continue;
    distance[node] = intensity;
    if (summits.includes(node)) continue;

    for (const [nextNode, nextIntens] of pathInfo[node]) {
      console.log(intensity, nextIntens);
      const nextIntensity = Math.max(intensity, nextIntens);

      if (distance[nextNode] && distance[nextNode] <= nextIntensity) continue;
      pq.push([nextIntensity, nextNode]);
    }
  }
  let answer = [0, Infinity];

  for (const summit of summits) {
    if (distance[summit] < answer[1]) {
      answer = [summit, distance[summit]];
    } else if (distance[summit] === answer[1] && summit < answer[0]) {
      answer = [summit, distance[summit]];
    }
  }
  return answer;
}

n = 7;
paths = [
  [1, 4, 4],
  [1, 6, 1],
  [1, 7, 3],
  [2, 5, 2],
  [3, 7, 4],
  [5, 6, 6],
];
gates = [1, 3, 7];
summits = [2, 4];

console.log(solution(n, paths, gates, summits));
