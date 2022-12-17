function solution(m, n, board) {
  let answer = 0;
  const check = (row, col, board) => {
    const indexArr = [
      [row, col + 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];

    const current = board[row][col];
    if (current === "X") return false;

    if (
      current === board[row][col + 1] &&
      current === board[row + 1][col] &&
      current === board[row + 1][col + 1]
    ) {
      //2중 배열, 중복 비교 위해 스트링으로 변환

      return [[row, col], ...indexArr].map((rowcol) => rowcol.join(","));
    }
  };

  const destroyBoard = (set) => {
    const colObj = {};

    [...set].forEach((rowcol) => {
      const [row, col] = rowcol.split(",");
      colObj[col] = colObj[col] ? [...colObj[col], row] : [row];
    });

    // colObj => col:[row1,row2]인데 오름차순으로 되어 있음.
    Object.keys(colObj).forEach((col) => {
      let deleteRows = colObj[col];
      const colValues = [];
      for (let row = 0; row < m; row++) {
        colValues.push(board[row][col]);
      }
      deleteRows.forEach((row) => (colValues[row] = ""));
      let newColvalues = colValues.join("").padStart(m, "X");

      for (let row = 0; row < m; row++) {
        board[row][col] = newColvalues[row];
      }
    });
  };

  board = board.map((row) => row.split(""));

  let flag = true;
  while (flag) {
    flag = false;
    let set = new Set();
    for (let row = 0; row < m - 1; row++) {
      for (let col = 0; col < n - 1; col++) {
        let canBroke = check(row, col, board);
        if (canBroke) {
          flag = true;
          canBroke.forEach((el) => set.add(el));
        }
      }
    }
    answer += set.size;
    destroyBoard(set);
  }

  return answer;
}

console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);
