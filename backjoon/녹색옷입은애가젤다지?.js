let input = `3
5 5 4
3 9 1
3 2 7
5
3 7 2 0 1
2 8 0 9 1
1 2 1 8 1
9 8 9 2 0
3 6 5 1 5
7
9 0 5 1 1 5 3
4 1 2 1 6 5 3
0 7 6 1 6 8 5
1 1 7 8 3 2 3
9 4 0 7 6 4 1
5 8 3 2 4 8 3
7 4 8 4 8 3 4
0`.split("\n");

while (input.length) {
  const N = input.shift();

  if (N == 0) break;
  let tmpInput = input.splice(0, N);

  const board = tmpInput.map((row) => row.split(" ").map(Number));
  let cost = board[0][0];
  let distance = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Infinity)
  );
  distance[0][0] = cost;

  const queue = [[0, 0, cost]];

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length) {
    const costArr = queue.map((el) => el[2]);

    const smallIdx = costArr.indexOf(Math.min(...costArr));

    const [r, c, currentCost] = queue[smallIdx];
    queue.splice(smallIdx, 1);

    for (const dir of dirs) {
      const nr = r + dir[0];
      const nc = c + dir[1];

      if (nr < 0 || nr > N - 1 || nc > N - 1 || nc < 0) continue;

      if (board[nr][nc] + currentCost < distance[nr][nc]) {
        distance[nr][nc] = board[nr][nc] + currentCost;
        queue.push([nr, nc, distance[nr][nc]]);
      }
    }
  }
  console.log(distance[N - 1][N - 1]);
}
