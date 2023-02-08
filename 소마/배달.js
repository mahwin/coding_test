function solution(N, road, K) {
  const graph = {};
  road.forEach(([a, b, c]) => {
    graph[a] = graph[a] ? [...graph[a], [b, c]] : [[b, c]];
    graph[b] = graph[b] ? [...graph[b], [a, c]] : [[a, c]];
  });
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  let queue = [[1, 0]]; // [시작노드, 코스트]
  distance[1] = 0;
  while (queue.length) {
    const disArr = queue.map((el) => el[1]);
    const smallIdx = disArr.indexOf(Math.min(...disArr));
    const [node, dis] = queue[smallIdx];
    queue.splice(smallIdx, 1);
    if (distance[node] < dis) continue;
    for (const el of graph[node]) {
      const [nextNode, nextDis] = el;
      let accDis = nextDis + dis;
      if (distance[nextNode] > accDis) {
        distance[nextNode] = accDis;
        queue.push([nextNode, accDis]);
      }
    }
  }
  let answer = 0;
  distance.forEach((n) => {
    if (n <= K) answer++;
  });
  console.log(distance);
  return answer;
}
