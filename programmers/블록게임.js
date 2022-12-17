const check = (indexArr) => {
  let rowCounter = {};
  indexArr.forEach((el) => {
    rowCounter[el[0]] = rowCounter[el[0]]
      ? [...rowCounter[el[0]], el[1]]
      : [el[1]];
  });
  let keys = Object.keys(rowCounter);
  keys.sort((a, b) => a - b);
  if (keys.length === 2) {
    //가로가 긴 상태
    if (rowCounter[keys[0]].length > rowCounter[keys[1]].length) return null;
    else {
      let v = rowCounter[keys[0]];
      let newIdx = rowCounter[keys[1]].filter((el) => el !== v[0]);
      return newIdx.map((el) => [+keys[1], el]);
    }
  } else {
    //세로가 긴 상태
    if (rowCounter[keys[0]].length < rowCounter[keys[2]].length) {
      let newIdx = rowCounter[keys[2]].filter(
        (el) => el !== rowCounter[keys[1]][0]
      )[0];
      return [[+keys[2], newIdx]];
    } else return null;
  }
};

function solution(board) {
  let answer = 0;
  let blockObj = {};

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      let current = board[row][col];
      if (current) {
        blockObj[current] = blockObj[current]
          ? [...blockObj[current], [row, col]]
          : [[row, col]];
      }
    }
  }

  let needCheck = {};

  Object.keys(blockObj).forEach((key) => {
    tmp = check(blockObj[key]);
    if (tmp) needCheck[key] = tmp;
  });
  console.log(needCheck);
  let keys = Object.keys(needCheck);
  let flag = true;
  let notBreak;
  while (flag) {
    flag = false;
    notBreak = false;
    for (let key of keys) {
      idxArr = needCheck[key];
      notBreak = false;
      for (let pos of idxArr) {
        for (let i = 0; i < pos[0]; i++) {
          if (board[i][pos[1]] !== 0) {
            notBreak = true;
            break;
          }
        }
      }
      if (notBreak) {
        continue;
      }

      answer += 1;
      blockObj[key].forEach(([row, col]) => (board[row][col] = 0));
      flag = true;
      keys = keys.filter((el) => el !== key);
    }
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
//                                                     #
//    #                                                #
//   ###                                               # #
// 가로가 길고 그 위에 같은 색 블록이면 가능성 있음, 세로로 길면 제일 행이 높은 곳 옆에 같은 색 블록이어야 가능성 있음

//
