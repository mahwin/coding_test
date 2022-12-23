let input = `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`.split("\n");

let [N, M, X] = input[0].split(" ").map(Number);
input = input.slice(1).map((el) => el.split(" ").map(Number));

// 1.출발 노드 설정
// 2.출발 노드를 기준으로 각 노드의 최소 비용을 저장
// 3.방문하지 않은 노드 중에서 가장 비용이 적은 노드를 선택
// 4.해당 노드를 거쳐서 특정한 노드를 가느 ㄴ경우를 고려하여 최소 비용을갱신
// 위 과정 3,4 번 반복

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < input.length; i++) {
  const [from, to, cost] = input[i];

  graph[from].push([to, cost]);
}

function Dijkstra(start, N, graph) {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  distance[start] = 0;

  const queue = [];
  queue.push([start, 0]);

  while (queue.length) {
    const qdistance = queue.map((x) => x[1]);
    const idx = qdistance.indexOf(Math.min(...qdistance));

    const node = queue[idx][0];

    const nodeDistance = queue[idx][1];

    //원본 배열 제거
    queue.splice(idx, 1);

    if (distance[node] < nodeDistance) continue;

    for (let j = 0; j < graph[node].length; j++) {
      const [next, nextDis] = graph[node][j];

      const distanceSum = nextDis + nodeDistance;

      if (distance[next] > distanceSum) {
        distance[next] = distanceSum;
        queue.push([next, distanceSum]);
      }
    }
  }

  return distance;
}

let max = -Infinity;
let resultArr = [[]];
for (let student = 1; student <= N; student++) {
  resultArr.push(Dijkstra(student, N, graph));
}

resultArr.forEach((dist, i) => {
  max = Math.max(dist[X] + resultArr[X][i]);
});
console.log(max);
