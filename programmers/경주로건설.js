function solution(board) {
  const N = board.length;
  // DIRECTIONS 배열의 index가 실제 방향을 탐색하는데 쓰이는 값이다. 오/왼/위/아래 -> 0/1/2/3
  const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  const dp = Array(N)
    .fill()
    .map(() =>
      Array(N)
        .fill()
        .map(() => Array(4).fill(Infinity))
    );

  const isValid = (x, y) =>
    x >= 0 && x < N && y >= 0 && y < N && board[x][y] !== 1;

  console.log(isValid(3, 3));

  const queue = [
    [0, 0, 0, 0],
    [0, 0, 0, 3],
  ];

  while (queue.length) {
    const [x, y, cost, dir] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const [mx, my] = DIRECTIONS[i];
      const [_x, _y] = [x + mx, y + my];
      if (isValid(_x, _y)) {
        let new_cost = cost + 100;
        if (dir !== i) new_cost += 500;
        if (new_cost < dp[_x][_y][i]) {
          // => 3차원 배열로 Dp를 구성하지 않으면 값이 역전되는 경우가 발생함 그래서 모든 방향으로 dp 값을 확장해 줘여함
          dp[_x][_y][i] = new_cost;
          queue.push([_x, _y, new_cost, i]);
        }
      }
    }
  }

  return Math.min(...dp[N - 1][N - 1]);
}

console.log(
  solution([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);
