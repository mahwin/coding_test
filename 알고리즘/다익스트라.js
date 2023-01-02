// 1. 출발 노드를 설정
// 2. 출발 노드를 기준으로 각 노드의 최소 비용을 저장
// 3. 방문하지 않은 노드 중에서 가장 비용이 적은 노드를 선택
// 4. 해당 노드를 거쳐서 특정한 노드로 가는 경우를 고려하여 최소 비용을 갱신
// 5. 3~4 과정 반복

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

function 다익스트라(startNode, numberOfNode, array) {
  const board = Array.from({ length: numberOfNode + 1 }, () =>
    Array.from({ length: numberOfNode + 1 }, () => Infinity)
  );

  for (let node = 1; node < numberOfNode + 1; node++) {
    board[node][node] = 0;
  }

  for (let i = 0; i < array.length; i++) {
    const [from, to, dist] = array[i];
    board[from][to] = dist;
    board[to][from] = dist;
  }

  const visited = Array.from({ length: numberOfNode + 1 }, () => false);
  const distance = Array.from({ length: numberOfNode + 1 }, () => Infinity);

  const getSmallIndex = () => {
    let min = Infinity;
    let index = 0;
    for (let i = 1; i < numberOfNode + 1; i++) {
      if (distance[i] < min && !visited[i]) {
        min = distance[i];
        index = i;
      }
    }
    return index;
  };

  const dijkstra = (startNode) => {
    for (let i = 1; i < numberOfNode + 1; i++) {
      distance[i] = board[startNode][i];
    }
    visited[startNode] = true;
    for (let i = 1; i < numberOfNode - 1; i++) {
      let current = getSmallIndex();
      visited[current] = true;
      for (let j = 1; j < numberOfNode + 1; j++) {
        if (!visited[j]) {
          if (distance[current] + board[current][j] < distance[j]) {
            distance[j] = distance[current] + board[current][j];
          }
        }
      }
    }
  };
  dijkstra(startNode);
  console.log(distance);
}

다익스트라(2, 6, [
  [1, 2, 2],
  [1, 3, 5],
  [1, 4, 1],
  [2, 3, 3],
  [2, 4, 2],
  [3, 5, 1],
  [3, 6, 5],
  [4, 5, 1],
  [5, 6, 2],
]);
