let input = `2
3 2 2
2 1 5
3 2 5
3 3 1
2 1 2
3 1 8
3 2 4`.split("\n");

let cases = input.shift();

while (cases--) {
  const [n, d, c] = input.shift().split(" ").map(Number);
  const currentInput = input.splice(0, d);
  const graph = Array.from({ length: n + 1 }, () => []);
  const distance = Array.from({ length: n + 1 }, () => Infinity);

  currentInput.forEach((el) => {
    const [a, b, cost] = el.split(" ").map(Number);
    graph[b].push([a, cost]);
  });

  const queue = [[c, 0]];
  while (queue.length) {
    const costArr = queue.map((el) => el[1]);
    const smallIdx = costArr.indexOf(Math.min(...costArr));
    const [node, cost] = queue[smallIdx];
    queue.splice(smallIdx, 1);

    if (!graph[node]) continue;
    for (let [nextNode, nextCost] of graph[node]) {
      if (distance[nextNode] > nextCost + cost) {
        distance[nextNode] = nextCost + cost;

        queue.push([nextNode, distance[nextNode]]);
      }
    }
  }
  const arr = distance.filter((n) => n !== Infinity);

  console.log(arr.length + 1 + " " + Math.max(...arr));
}
