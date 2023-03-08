const solution = (board, aloc, bloc) => {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const yMax = board.length;
  const xMax = board[0].length;

  const dfs = (aLoc, bLoc, turn, cnt) => {
    if (
      (turn === 0 && board[aLoc[0]][aLoc[1]] === 0) ||
      (turn === 1 && board[bLoc[0]][bLoc[1]] === 0)
    )
      return { win: false, cnt: cnt };
    let win = Infinity;
    let lose = 0;

    const typedLoc = turn === 0 ? aLoc : bLoc;
    board[typedLoc[0]][typedLoc[1]] = 0;

    for (let idx = 0; idx < 4; idx++) {
      const nextLoc = [typedLoc[0] + dx[idx], typedLoc[1] + dy[idx]];
      if (
        nextLoc[0] < 0 ||
        nextLoc[0] >= yMax ||
        nextLoc[1] < 0 ||
        nextLoc[1] >= xMax ||
        !board[nextLoc[0]][nextLoc[1]]
      )
        continue;
      const check =
        turn === 0
          ? dfs(nextLoc, bLoc, 1 - turn, cnt + 1)
          : dfs(aLoc, nextLoc, 1 - turn, cnt + 1);
      if (check.win === false) win = Math.min(win, check.cnt);
      else lose = Math.max(lose, check.cnt);
    }

    board[typedLoc[0]][typedLoc[1]] = 1;
    if (win === Infinity && lose === 0) return { win: false, cnt };
    else if (win !== Infinity) return { win: true, cnt: win };
    else return { win: false, cnt: lose };
  };

  return dfs(aloc, bloc, 0, 0).cnt;
};
