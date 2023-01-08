function solution(board, r, c) {
  let answer = Infinity;
  let allCard = {};
  let allRemoved = 1; // 제거할 카드를 확인하기 위함. (비트연산)
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r > 3 || c > 3) return false;
    else return true;
  };

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let num = board[row][col];
      if (num) {
        allRemoved |= 1 << num;
        if (Object.keys(allCard).includes(num + "")) {
          allCard[num].push([row, col]);
        } else {
          allCard[num] = [[row, col]];
        }
      }
    }
  }

  const bfs = (removed, src, dst) => {
    const queue = [[...src, 0]];
    const visited = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => false)
    );
    visited[src[0]][src[1]] = true;

    while (queue.length) {
      const [r, c, cnt] = queue.shift();

      if (r === dst[0] && c === dst[1]) return cnt;
      for (const dir of dirs) {
        let nr = r + dir[0];
        let nc = c + dir[1];
        if (!isValid(nr, nc)) continue;
        if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc, cnt + 1]);
        }
        for (j = 0; j < 2; j++) {
          if ((removed & (1 << board[nr][nc])) === 0) break;

          if (isValid(nr + dir[0], nc + dir[1])) {
            nr += dir[0];
            nc += dir[1];
          } else break;
        }

        if (!visited[nr][nc]) queue.push([nr, nc, cnt + 1]);
      }
    }
    return Infinity;
  };
  const permutation = (cnt, removed, src) => {
    if (removed === allRemoved) {
      answer = Math.min(cnt, answer);
      return;
    }

    for (const [num, card] of Object.entries(allCard)) {
      if (removed & (1 << num)) continue;

      let one = bfs(removed, src, card[0]) + bfs(removed, card[0], card[1]) + 2;
      let two = bfs(removed, src, card[1]) + bfs(removed, card[1], card[0]) + 2;
      permutation(cnt + one, removed | (1 << num), card[1]);
      permutation(cnt + two, removed | (1 << num), card[0]);
    }
  };

  permutation(0, 1, [r, c, 0]); // 토탈 조작횟수, 제거된 카드 확인 (비트 연산), 시작 지점

  return answer;
}

solution(
  [
    [1, 0, 0, 3],
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [3, 0, 1, 0],
  ],
  1,
  0
);
