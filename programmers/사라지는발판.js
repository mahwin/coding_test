function solution(board, aloc, bloc) {
  const search = (board, aloc, bloc, turn) => {
    // turn => 짝수 ? a 무브 : b 무브
    let loc = turn % 2 === 0 ? [...aloc] : [...bloc];
    const dirs = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    let nLoc = [];
    for (let dir of dirs) {
      nLoc.push([loc[0] + dir[0], loc[1] + dir[1]]);
    }

    nLoc = nLoc.filter(
      ([x, y]) =>
        x > -1 &&
        y > -1 &&
        x < board.length &&
        y < board[0].length &&
        board[x][y]
    );

    //게임 종료 조건
    if (nLoc.length === 0) return false; // 현재 플레이어 패
    else if (aloc === bloc) return true; // 다음 플레이어 패

    let canWin = false;

    for (const next of nLoc) {
      board[loc[0]][loc[1]] = 0;
      if (turn % 2 === 0) {
        result = search(board, next, bloc, turn + 1);
      } else {
        result = search(board, aloc, next, turn + 1);
      }
      board[loc[0]][loc[1]] = 1;

      if (!result) {
        // 다음 플레이어가 패배하는 경우 ===> 현 플레이어 승
        canWin = true;
      }
    }
    return canWin;
  };

  console.log(search(board, aloc, bloc, 0));
}

solution(
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [1, 0],
  [1, 2]
);
