const convertIdx = (r, c) => (Number(r) - 1) * 50 + Number(c) - 1;

const board = [];

for (let r = 1; r < 51; r++) {
  for (let c = 1; c < 51; c++) {
    board.push({ x: convertIdx(r, c), val: null });
  }
}

function getP(x) {
  const p1 = board[x].x;
  if (p1 === x) return p1;

  board[x].x = getP(p1);
  return board[x].x;
}

function union(p1, p2, val) {
  if (p1 > p2) {
    board[p1] = { x: p2, val };
    board[p2].val = val;
  } else {
    board[p2] = { x: p1, val };
    board[p1].val = val;
  }
}

function solution(commands) {
  const result = [];

  let r1, c1, r2, c2, val1, val2, p1, p2, unmergeArr;

  for (const commandInfo of commands) {
    const [command, ...rest] = commandInfo.split(" ");

    switch (command) {
      case "UPDATE":
        if (rest.length === 2) {
          [val1, val2] = rest;
          board.forEach((obj, i) => {
            if (obj.val === val1) {
              board[i].val = val2;
            }
          });
        } else {
          [r1, c1, val1] = rest;
          p1 = getP(convertIdx(r1, c1));
          board[p1].val = val1;
        }
        break;
      case "PRINT":
        [r1, c1] = rest;
        p1 = getP(convertIdx(r1, c1));
        result.push(board[p1].val ? board[p1].val : "EMPTY");
        break;

      case "MERGE":
        [r1, c1, r2, c2] = rest;

        p1 = getP(convertIdx(r1, c1));
        p2 = getP(convertIdx(r2, c2));

        val1 = board[p1].val ? board[p1].val : board[p2].val;
        union(p1, p2, val1);
        break;
      case "UNMERGE":
        [r1, c1] = rest;
        p1 = getP(convertIdx(r1, c1));
        val = board[p1].val;
        unmergeArr = [];
        board.forEach((obj, i) => {
          if (getP(obj.x) === p1) {
            unmergeArr.push(i);
          }
        });
        unmergeArr.forEach((idx) => {
          board[idx] = { x: idx, val: null };
        });
        board[convertIdx(r1, c1)].val = val;
        break;
    }
  }
  return result;
}
