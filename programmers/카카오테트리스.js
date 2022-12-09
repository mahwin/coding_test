function solution(board) {
  let answer = 0;

  let tetrisObj = {};
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // row 0으로
      // col 0 ~ 끝까지
      let value = board[row][col];
      tetrisObj[value] = tetrisObj[value]
        ? tetrisObj[value].concat([[row, col]])
        : [[row, col]];
    }
  }

  delete tetrisObj[0];

  const validator = (arr, board) => {
    //마지막과 직전 원소의 행 값이 같아야함.
    let needCheck = [];

    if (arr[2][0] === arr[3][0]) {
      //가로로 긴 상태
      needCheck = arr.filter(([_, col]) => arr[0][1] !== col);

      for (let [row, col] of needCheck) {
        for (let i = 0; i < row; i++) {
          if (board[i][col] !== 0) {
            return false;
          }
        }
      }
      return true;
    }
  };

  let flag = true;
  while (flag) {
    flag = false;
    Object.keys(tetrisObj).forEach((key) => {
      if (validator(tetrisObj[key], board)) {
        flag = true;
        tetrisObj[key].forEach(([row, col]) => {
          board[row][col] = 0;
        });
        console.log(key);
        delete tetrisObj[[key]];
        answer++;
      }
    });
  }

  return answer;
}

console.log(
  solution([
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [3, 0, 0, 2, 0],
    [3, 2, 2, 2, 0],
    [3, 3, 0, 0, 0],
  ])
);
