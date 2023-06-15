const flipCol = (board, target, rowLen, colLen) => {
  // col 방향으로 체크하며 target과 다르다면 뒤집기.
  let cnt = 0;
  let cols = new Set();
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (board[r][c] !== target[r][c]) cols.add(c);
    }
  }
  for (const col of [...cols]) {
    for (let r = 0; r < rowLen; r++) {
      board[r][col] = board[r][col] === 1 ? 0 : 1;
    }
  }
  return cols.size;
};

const flipRows = (board, rows, colLen) => {
  // dfs로 뽑은 조합에 따라 row방향으로 뒤집기.
  const copy = board.map((el) => [...el]);
  rows.forEach((row) => {
    for (let i = 0; i < colLen; i++) {
      copy[row][i] = copy[row][i] === 0 ? 1 : 0;
    }
  });
  return copy;
};

const isSame = (arr1, arr2, rowLen) => {
  for (let i = 0; i < rowLen; i++) {
    if (arr1[i].join("") !== arr2[i].join("")) return false;
  }
  return true;
};

function solution(beginning, target) {
  const rowLen = beginning.length;
  const colLen = beginning[0].length;
  let result = Infinity;

  const rows = [];
  const v = Array.from({ length: rowLen }, () => false);

  const dfs = (node) => {
    const filpBoard = flipRows(beginning, rows, colLen);
    const cnt = flipCol(filpBoard, target, rowLen, colLen);
    if (isSame(filpBoard, target, rowLen)) {
      result = Math.min(result, rows.length + cnt);
    }

    for (let i = node; i < rowLen; i++) {
      if (v[i]) continue;
      v[i] = true;
      rows.push(i);
      dfs(i + 1);
      v[i] = false;
      rows.pop();
    }
  };
  dfs(0);
  return result === Infinity ? -1 : result;
}
