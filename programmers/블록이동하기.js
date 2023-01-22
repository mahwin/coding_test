function solution(board) {
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const len = board.length;

  const isValid = (x, y) => {
    if (x > 0 && x <= len && y > 0 && y <= len && board[x - 1][y - 1] === 0)
      return true;
    return false;
  };

  const rotate = (x1, y1, x2, y2, cnt) => {
    const canRotatePos = [];
    if (x1 === x2) {
      // 수평일 때

      if (isValid(x1 + 1, y1) && isValid(x2 + 1, y2)) {
        canRotatePos.push([x2 + 1, y2, x2, y2, cnt + 1]);
        canRotatePos.push([x1, y1, x1 + 1, y1, cnt + 1]);
      }
      if (isValid(x1 - 1, y1) && isValid(x2 - 1, y2)) {
        canRotatePos.push([x2 - 1, y2, x2, y2, cnt + 1]);
        canRotatePos.push([x1, y1, x1 - 1, y1, cnt + 1]);
      }
    } else {
      if (isValid(x1, y1 - 1) && isValid(x2, y2 - 1)) {
        canRotatePos.push([x2, y2 - 1, x2, y2, cnt + 1]);
        canRotatePos.push([x1, y1, x1, y1 - 1, cnt + 1]);
      }
      if (isValid(x1, y1 + 1) && isValid(x2, y2 + 1)) {
        canRotatePos.push([x2, y2 + 1, x2, y2, cnt + 1]);
        canRotatePos.push([x1, y1, x1, y1 + 1, cnt + 1]);
      }
    }

    return canRotatePos;
  };

  let queue = [[1, 1, 1, 2, 0]]; // 좌표1 좌표 2 움직인 횟수
  let visited = Array.from({ length: len + 1 }, () =>
    Array.from({ length: len + 1 }, () =>
      Array.from({ length: len + 1 }, () =>
        Array.from({ length: len + 1 }, () => Infinity)
      )
    )
  );
  while (queue.length) {
    const [x1, y1, x2, y2, cnt] = queue.shift();
    if ((x1 === len && y1 === len) || (x2 === len && y2 === len)) return cnt;
    for (let dir of dirs) {
      let nx1 = x1 + dir[0];
      let nx2 = x2 + dir[0];
      let ny1 = y1 + dir[1];
      let ny2 = y2 + dir[1];
      if (
        isValid(nx1, ny1, len, board) &&
        isValid(nx2, ny2, len, board) &&
        visited[nx1][ny1][nx2][ny2] > cnt + 1
      ) {
        visited[nx1][ny1][nx2][ny2] = cnt + 1;
        queue.push([nx1, ny1, nx2, ny2, cnt + 1]);
      }
    }
    const rotateArr = rotate(x1, y1, x2, y2, cnt);
    for (const arr of rotateArr) {
      const [x1, y1, x2, y2, cnt] = arr;
      if (visited[x1][y1][x2][y2] > cnt + 1) {
        visited[x1][y1][x2][y2] = cnt + 1;
        queue.push(arr);
      }
    }
  }
}

console.log(
  solution([
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
  ])
);
