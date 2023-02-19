let input = `0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0`.split("\n");

const solution = () => {
  const board = [];
  const blank = [];
  for (let i = 0; i < 9; i++) {
    const el = input[i].split(" ").map(Number);
    board.push(el);
    el.forEach((n, j) => {
      if (n === 0) blank.push([i, j]);
    });
  }
  const target = blank.length;

  let flag = false;

  const dfs = (cnt) => {
    if (flag) return;

    if (cnt === target) {
      flag = true;
      board.forEach((el) => console.log(el.join(" ")));
      return;
    }
    const [r, c] = blank[cnt];
    for (let i = 1; i < 10; i++) {
      if (isValid(r, c, i)) {
        board[r][c] = i;
        dfs(cnt + 1);
        board[r][c] = 0;
      }
    }
  };
  function isValid(r, c, cur) {
    const ri = Math.floor(r / 3) * 3;
    const ci = Math.floor(c / 3) * 3;

    for (let row = ri; row <= ri + 2; row++) {
      for (let col = ci; col <= ci + 2; col++) {
        if (row === r && col === c) continue;
        if (board[row][col] === cur) return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (i !== c && board[r][i] === cur) return false;
      if (i !== r && board[i][c] === cur) return false;
    }
    return true;
  }
  dfs(0);
};

solution();
