function solution(rectangle, characterX, characterY, itemX, itemY) {
  let answer = Infinity;
  let MAX_LENGTH = 103;
  itemX *= 2;
  itemY *= 2;
  characterX *= 2;
  characterY *= 2;

  const board = Array.from({ length: MAX_LENGTH }, () =>
    Array.from({ length: MAX_LENGTH }, () => 0)
  );

  rectangle
    .map((el) => el.map((e) => e * 2))
    .forEach(([x1, y1, x2, y2]) => {
      for (let col = x1; col <= x2; col++) {
        for (let row = y1; row <= y2; row++) {
          const current = board[row][col];
          if (col === x1 || col === x2 || row === y1 || row === y2) {
            //테두리면
            if (current === 0) board[row][col] = 1;
          } else {
            board[row][col] = 2;
          }
        }
      }
    });

  const visited = Array.from({ length: MAX_LENGTH }, () =>
    Array.from({ length: MAX_LENGTH }, () => false)
  );
  visited[characterY][characterX] = true;

  const dfs = (x, y, cnt, MAX_LENGTH, pos) => {
    console.log(x, y, cnt, pos);
    if (pos[0] === x && pos[1] === y) {
      answer = Math.min(answer, cnt / 2);
      visited[pos[0]][pos[1]] = false;
      return;
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];

    for (let dir of dirs) {
      const newX = x + dir[0];
      const newY = y + dir[1];
      if (newX <= MAX_LENGTH && newY <= MAX_LENGTH) {
        if (board[newX][newY] === 1 && !visited[newX][newY]) {
          visited[newX][newY] = true;
          dfs(newX, newY, cnt + 1, MAX_LENGTH, [itemY, itemX]);
        }
      }
    }
  };

  dfs(characterY, characterX, 0, MAX_LENGTH, [itemY, itemX]);

  return answer;
}

console.log(
  solution(
    [
      [2, 2, 5, 5],
      [1, 3, 6, 4],
      [3, 1, 4, 6],
    ],
    1,
    4,
    6,
    3
  )
);
