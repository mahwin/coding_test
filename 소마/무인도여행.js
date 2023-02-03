function solution(maps) {
  maps = maps.map((el) => el.split(""));

  let answer = [];
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (row, col) => {
    if (row < 0 || col < 0 || row >= maps.length || col >= maps[0].length)
      return false;
    return true;
  };

  let cnt;

  const dfs = (row, col) => {
    for (const dir of dirs) {
      const nx = row + dir[0];
      const ny = col + dir[1];

      if (isValid(nx, ny) && maps[nx][ny] !== "X") {
        cnt += Number(maps[nx][ny]);
        maps[nx][ny] = "X";
        dfs(nx, ny);
      }
    }
  };

  for (let row = 0; row < maps.length; row++) {
    for (let col = 0; col < maps[0].length; col++) {
      if (maps[row][col] === "X") continue;
      cnt = Number(maps[row][col]);
      maps[row][col] = "X";
      dfs(row, col);
      answer.push(cnt);
    }
  }
  if (answer.length > 0) return answer.sort((a, b) => a - b);
  return [-1];
}

console.log(solution(["X591X", "X1X5X", "X231X", "1XXX1"]));
