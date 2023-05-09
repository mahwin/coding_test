const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const graph = [];
let [N, M] = [0, 0];

rl.on("line", (line) => {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    graph.push(line.split(" ").map(Number));
    if (graph.length === N) {
      solution();
      process.exit();
    }
  }
});

const solution = () => {
  let v = [];

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const bfs = (y, x) => {
    const queue = [];
    queue.push({ y, x });

    for (let i = 0; i < N; i++) {
      v[i] = new Array(M).fill(false);
    }
    v[y][x] = true;

    for (let i = 0; i < 4; i++) {
      const nY = dirs[i][0];
      const nX = dirs[i][1];

      if (0 <= nY && nY < N && 0 <= nX && nX < M) {
        if (!v[nY][nX] && graph[nY][nX]) {
          v[nY][nX] = true;
        }
      }
    }

    while (queue.length) {
      const cur = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nY = dirs[i][0];
        const nX = dirs[i][1];

        if (0 <= nY && nY < N && 0 <= nX && nX < M) {
          if (!visited[nY][nX] && !graph[nY][nX]) {
            visited[nY][nX] = true;
            queue.push({ y: nY, x: nX });

            for (let j = 0; j < 4; j++) {
              const aroundY = nY + dirs[i][0];
              const aroundX = nX + dirs[i][1];

              if (0 <= aroundY && aroundY < N && 0 <= aroundX && aroundX < M) {
                if (!visited[aroundY][aroundX] && graph[aroundY][aroundX]) {
                  visited[aroundY][aroundX] = true;
                }
              }
            }
          }
        }
      }
    }
  };

  let time = 0;
  let curCheese = graph.flat().filter((el) => el === 1).length;
  let preCheese;

  while (curCheese) {
    time++;
    bfs(0, 0);
    preCheese = graph.flat().filter((el) => el === 1).length;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (graph[i][j] === 1 && visited[i][j] === true) {
          graph[i][j]--;
        }
      }
    }

    curCheese = graph.flat().filter((el) => el === 1).length;
  }

  console.log(time);
  console.log(preCheese);
};
