function Dijkstra(startNode, numberOfNode, array) {
  const graph = Array.from({ length: numberOfNode + 1 }, () => []);

  for (let i = 0; i < array.length; i++) {
    const [from, to, dist] = array[i];
    graph[from].push([to, dist]);
    graph[to].push([from, dist]);
  }

  const queue = [];
  const distance = Array.from({ length: numberOfNode + 1 }, () => Infinity);
  distance[startNode] = 0;

  queue.push([startNode, 0]); //향하는 마을, 그 마을까지의 거리

  while (queue.length !== 0) {
    const qdistance = queue.map((x) => x[1]); // 거리 정보
    const shortDistanceIndex = qdistance.indexOf(Math.min(...qdistance));
    const currentNode = queue[shortDistanceIndex][0];
    const currentDistance = queue[shortDistanceIndex][1];

    queue.splice(shortDistanceIndex, 1);
    if (distance[currentNode] < currentDistance) continue;

    for (let j = 0; j < graph[currentNode].length; j++) {
      const nextNode = graph[currentNode][j][0];
      const nextDist = graph[currentNode][j][1];
      const newDist = nextDist + currentDistance;
      if (distance[nextNode] > newDist) {
        distance[nextNode] = newDist;
        queue.push([nextNode, newDist]);
      }
    }
  }

  return distance;
}
