let input = `1
4 3 1
2 1 4
3 2 4
4 3 4`.split("\n");

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

  let queue = [...graph[start]];

  while (queue.length) {
    const disArr = queue.map((el) => el[1]);
    const smallIdx = disArr.indexOf(Math.min(...disArr));
    console.log(queue, smallIdx);
    const [node, dis] = queue[smallIdx];
    queue.splice(smallIdx, 1);

    if (d[node] < dis) continue;
    d[node] = dis;

    for (let i = 0; i < graph[node].length; i++) {
      const nextNode = graph[node][i][0];
      const nextDis = graph[node][i][1];
      const sumDis = nextDis + dis;
      if (d[nextNode] > sumDis) {
        d[nextNode] = sumDis;
        queue.push([nextNode, sumDis]);
      }
    }
  }

  let cnt = 0;
  let max = 0;
  for (let i = 1; i < com + 1; i++) {
    if (d[i] !== Infinity) {
      cnt++;
      max = Math.max(d[i], max);
    }
  }
  console.log(d);

  console.log(`${cnt} ${max}`);
}
