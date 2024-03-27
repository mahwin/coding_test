const n = 4;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
function solution(board, r, c) {
  const cardPos = {};
  let cardSet = new Set();

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) continue;
      if (!cardPos[board[r][c]]) {
        cardPos[board[r][c]] = [[r, c]];
        continue;
      }
      cardSet.add(board[r][c]);
      cardPos[board[r][c]].push([r, c]);
    }
  }

  const permus = permutation([...cardSet]);
  let result = Infinity;

  for (const route of permus) {
    const copyBoard = board.map((el) => [...el]);
    result = Math.min(result, search(route, copyBoard, r, c, cardPos));
  }
  return result + cardSet.size * 2;
}

function search(route, board, r, c, cardPos) {
  let result = Infinity;

  const dfs = (cardIdx, cnt, curR, curC) => {
    if (cardIdx === route.length) {
      result = Math.min(result, cnt);
      return;
    }

    const card = route[cardIdx];
    const [A, B] = cardPos[card];

    const curToA = getDistance(board, curR, curC, ...A);
    const AtoB = getDistance(board, ...A, ...B);
    const curToB = getDistance(board, curR, curC, ...B);
    const BtoA = getDistance(board, ...B, ...A);

    board[A[0]][A[1]] = 0;
    board[B[0]][B[1]] = 0;
    dfs(cardIdx + 1, cnt + curToA + AtoB, ...B);
    dfs(cardIdx + 1, cnt + curToB + BtoA, ...A);
    board[A[0]][A[1]] = card;
    board[B[0]][B[1]] = card;
  };

  dfs(0, 0, r, c);
  return result;
}

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 4 || c >= 4) return false;
  return true;
};

const getDistance = (board, fromR, fromC, toR, toC) => {
  if (fromR === toR && toC === fromC) return 0;
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Infinity)
  );
  const q = [[fromR, fromC, 0]];
  while (q.length) {
    const [r, c, cnt] = q.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];

      if (isValid(nr, nc) && v[nr][nc] > cnt + 1) {
        v[nr][nc] = cnt + 1;
        q.push([nr, nc, cnt + 1]);
      }

      let cntR = r;
      let cntC = c;

      while (isValid(cntR + d[0], cntC + d[1])) {
        cntR += d[0];
        cntC += d[1];
        if (board[cntR][cntC] !== 0) break;
      }

      if ((nr !== cntR || nc !== cntC) && v[cntR][cntC] > cnt + 1) {
        v[cntR][cntC] = cnt + 1;
        q.push([cntR, cntC, cnt + 1]);
      }
      if (nr === toR && nc === toC) return cnt + 1;
      if (cntR === toR && cntC === toC) return cnt + 1;
    }
  }
};

const permutation = (arr) => {
  const permus = [];
  const v = Array.from({ length: arr.length }, () => false);

  const dfs = (depth, tmpArr) => {
    if (depth === arr.length) {
      permus.push(tmpArr);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(depth + 1, tmpArr.concat(arr[i]));
      v[i] = false;
    }
  };
  dfs(0, []);
  return permus;
};
