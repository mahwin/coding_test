let input = `1
3 2 1
2 1 4
3 2 4`.split("\n");

let tests = Number(input.shift());

for (let test = 0; test < tests; test++) {
  const [com, n, start] = input.shift().split(" ").map(Number);
  const d = Array.from({ length: com + 1 }, () => Infinity);
  d[start] = 0;
  const graph = Array.from({ length: com + 1 }, () => []);
  for (let i = 0; i < n; i++) {
    [a, b, s] = input.shift().split(" ").map(Number);
    graph[b].push([a, s]);
  }

  let queue = graph[start];
  while (queue.length) {
    let disInfo = queue.map((el) => el[1]);
    let smallIdx = disInfo.indexOf(Math.min(...disInfo));
    let [node, dis] = queue[smallIdx];
    queue.splice(smallIdx, 1);
    if (d[node] < dis) continue;
    d[node] = dis;

    for (let j = 0; j < graph[node].length; j++) {
      const nextNode = graph[node][j][0];
      const nextDist = graph[node][j][1];
      const newDist = nextDist + dis;
      if (d[nextNode] > newDist) {
        d[nextNode] = newDist;
        queue.push([nextNode, newDist]);
      }
    }
  }
  let cnt = 0;
  let max = 0;
  console.log(d);
  for (let i = 1; i < com + 1; i++) {
    if (d[i] !== Infinity) {
      cnt++;
      max = Math.max(d[i], max);
    }
  }
  console.log(`${cnt} ${max}`);
}
