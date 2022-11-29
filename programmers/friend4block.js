function solution(m, n, board) {
  let answer = 0;

  const boardExtensor = (board) => {
    board = board.map((row) => [...row, "-"]);
    extensionRow = Array.from({ length: board[0].length }, () => "-");
    return [...board, extensionRow];
  };

  const check = (row, col, char, board) => {
    if (
      board[row + 1][col] === board[row][col + 1] &&
      board[row + 1][col + 1] === char &&
      board[row + 1][col] === char
    )
      return true;
    else return false;
  };

  const search = (m, n, board) => {
    let deleteSet = new Set();
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        const char = board[row][col];
        if (char === "-") continue;
        const canDelete = check(row, col, char, board);

        if (canDelete) {
          deleteSet = new Set([
            ...deleteSet,
            ...[
              [row, col].join("."),
              [row, col + 1].join("."),
              [row + 1, col].join("."),
              [row + 1, col + 1].join("."),
            ],
          ]);
        }
      }
    }
    //key colIdx value rowIDx Array
    //{'col1':[ row1 , row2 ]}
    let colObj = {};
    deleteSet.forEach((el) => {
      const [row, col] = el.split(".").map((n) => +n);
      let items = colObj[col];
      if (items) {
        colObj[col].push(row);
      } else {
        colObj[col] = [row];
      }
    });
    return colObj;
  };

  let extensionBoard = boardExtensor(board);
  let colObj = search(m, n, extensionBoard);
  extensionBoard.forEach((b) => console.log(b.join("")));
  while (Object.keys(colObj).length > 0) {
    Object.keys(colObj).forEach((col) => {
      let brokenRows = colObj[col];
      answer += brokenRows.length;
      let startRow = brokenRows[brokenRows.length - 1];
      let currentRow = startRow;
      console.log(brokenRows);

      while (currentRow > -1) {
        startRow--;
        if (startRow < 0) {
          extensionBoard[currentRow][col] = "-";
          currentRow--;
        } else if (!brokenRows.includes(startRow)) {
          extensionBoard[currentRow][col] = extensionBoard[startRow][col];
          currentRow--;
        }
      }
    });

    colObj = search(m, n, extensionBoard);
  }
  return answer;
}

console.log(
  solution(10, 10, [
    "DDABBAABBA",
    "AAAAAABBBA",
    "DDACCBBBAA",
    "DDABBBBBAA",
    "AAABBABBBA",
    "CCADDAABBB",
    "CCADDAABBB",
    "BBACCABBBA",
    "BBAAABBBAA",
    "DDABBBBAAA",
  ])
);

// console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));
