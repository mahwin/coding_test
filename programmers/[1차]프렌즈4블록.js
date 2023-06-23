let rowLen, colLen;
const dirs = [
  [0, 1],
  [1, 0],
  [1, 1],
];

const down = (arr, board) => {
  arr.forEach((rc) => {
    const [r, c] = rc.split(",").map(Number);
    board[r][c] = ".";
  });

  for (let c = 0; c < colLen; c++) {
    let tmp = "";
    // 밑에서 부터 남아있는 블럭을 모으고
    for (let r = rowLen - 1; r >= 0; r--) {
      if (board[r][c] != ".") tmp += board[r][c];
    }
    tmp = tmp.padEnd(rowLen, ".").split("").reverse(); // 'AA'=> 'AA.....' 길이만큼 맞춰주고
    for (let r = 0; r < rowLen; r++) {
      board[r][c] = tmp[r];
    }
  }
};

const find4Block = (row, col, board) => {
  const charactor = board[row][col];
  const route = [];
  for (const d of dirs) {
    const nr = d[0] + row;
    const nc = d[1] + col;
    if (board[nr][nc] !== charactor) return [];
  }
  return [
    [row, col],
    [row + 1, col],
    [row, col + 1],
    [row + 1, col + 1],
  ];
};

const search = (board) => {
  let blockSet = new Set();
  for (let r = 0; r < rowLen - 1; r++) {
    for (let c = 0; c < colLen - 1; c++) {
      if (board[r][c] == ".") continue;
      const brokenBlock = find4Block(r, c, board);
      if (brokenBlock.length > 0) {
        brokenBlock.forEach((el) => blockSet.add(el.join(",")));
      }
    }
  }
  return [...blockSet];
};

function solution(m, n, board) {
  board = board.map((el) => el.split(""));
  [rowLen, colLen] = [board.length, board[0].length];
  let result = 0;

  while (true) {
    const brokenBlock = search(board);

    if (brokenBlock.length == 0) return result;
    else result += brokenBlock.length;

    down(brokenBlock, board);
  }
}
