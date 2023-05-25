const n = 51;
// [51*51][2]  [idx][idx,null] =>  [인덱스][부모idx,저장 데이터];
let board = Array.from({ length: n * n }, (_, i) => [i, null]);

//2차원 배열을 1차원으로 표현했을 때의 idx를 리턴
const conversion1D = (r, c) => r * (n - 1) + c;

const getP = (x1) => {
  if (x1 === board[x1][0]) return x1;
  else board[x1][0] = getP(board[x1][0]);
  return board[x1][0];
};

const merge = (x1, x2, value) => {
  const p1 = getP(x1);
  const p2 = getP(x2);
  if (p1 > p2) {
    board[p1] = [p2, value];
    board[p2] = [p2, value];
  } else {
    board[p2] = [p1, value];
    board[p1] = [p1, value];
  }
};

const unMerge = (p1) => {
  let len = n * n;
  let unMergeArr = [];
  for (let x = 0; x < len; x++) {
    const p = getP(x);
    if (p === p1) unMergeArr.push(x);
  }
  unMergeArr.forEach((i) => (board[i] = [i, null]));
};

const update = (value1, value2) => {
  board.forEach((el, i) => {
    if (el[1] === value1) board[i][1] = value2;
  });
};

function solution(commands) {
  let result = [];
  let r1, r2, c1, c2, p1, p2, x1, x2, value1, value2, tmp;

  commands.forEach((command) => {
    const [com, ...infos] = command.split(" ");
    switch (com) {
      case "UPDATE":
        if (infos.length === 3) {
          [r1, c1, value1] = [+infos[0], +infos[1], infos[2]];
          x1 = conversion1D(r1, c1);
          p1 = getP(x1);
          board[p1][1] = value1;
        } else {
          [value1, value2] = infos;
          update(value1, value2);
        }
        break;
      case "MERGE":
        [r1, c1, r2, c2] = infos.map(Number);
        x1 = conversion1D(r1, c1);
        x2 = conversion1D(r2, c2);
        p1 = getP(x1);
        p2 = getP(x2);
        if (p1 != p2) {
          value1 = board[p1][1];
          value2 = board[p2][1];
          tmp = value1 || value2;
          merge(p1, p2, tmp);
        }

        break;
      case "UNMERGE":
        [r1, c1] = infos.map(Number);
        x1 = conversion1D(r1, c1);
        p1 = getP(x1);
        value1 = board[p1][1];
        unMerge(p1); // p1을 바라보던 모든 셀들을 자기 자신의 [idx,null]로 바꿈
        board[x1] = [x1, value1];
        break;
      case "PRINT":
        [r1, c1] = infos.map(Number);
        x1 = conversion1D(r1, c1);
        p1 = getP(x1);
        result.push(board[p1][1] || "EMPTY");
        break;
    }
  });
  return result;
}
