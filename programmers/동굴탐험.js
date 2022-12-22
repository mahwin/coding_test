function solution(n, path, order) {
  let isBanned = Array.from({ length: n }, () => false);

  order.forEach(([A, B]) => {
    isBanned[B] = isBanned[B] ? [...isBanned[B], A] : [A];
  });

  if (isBanned[0]) return false;

  let graph = {};
  path.forEach(([from, to]) => {
    graph[from] = graph[from] ? [...graph[from], to] : [to];
    graph[to] = graph[to] ? [...graph[to], from] : [from];
  });

  let visited = new Set([0]);

  while (true) {
    let cnt = visited.size;
    for (let node of [...visited]) {
      for (let next of graph[node]) {
        if (!isBanned[next]) {
          visited.add(next);
        }
      }
    }

    // console.log(isBanned, visited);
    for (let node of [...visited]) {
      for (let next of graph[node]) {
        if (isBanned[next]) {
          let flag = true;
          isBanned[next].forEach((el) => {
            if (![...visited].includes(el)) flag = false;
          });
          if (flag) {
            isBanned[next] = false;
            visited.add(next);
          }
        }
      }
    }

    if (visited.size === n) return true;
    if (visited.size === cnt) return false;
  }
}

console.log(
  solution(
    9,
    [
      [0, 1],
      [0, 3],
      [0, 7],
      [8, 1],
      [3, 6],
      [1, 2],
      [4, 7],
      [7, 5],
    ],
    [[1, 0]]
  )
);
