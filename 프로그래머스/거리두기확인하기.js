const length = 5;
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const minimumD = 2;

function getDistance(r1, c1, r2, c2) {
  return Math.abs(r2 - r1) + Math.abs(c2 - c1);
}

function check(board, r, c) {
  // 5x5라서 set으로 관리하면 훨씬 편함.
  const posSet = new Set();

  posSet.add([r, c].join(""));

  const q = [[r, c]];

  while (q.length) {
    const [cr, cu] = q.shift();
    for (const d of dirs) {
      const nr = cr + d[0];
      const nc = cu + d[1];
      if (nr < 0 || nr >= length || nc < 0 || nc >= length) continue;
      if (getDistance(r, c, nr, nc) > 2) continue;
      if (posSet.has([nr, nc].join(""))) continue;
      if (board[nr][nc] === "P") return false;
      if (board[nr][nc] === "O") {
        q.push([nr, nc]);
        posSet.add([nr, nc].join(""));
      }
    }
  }

  return true;
}

function bfs(board) {
  const length = 5;
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  for (let r = 0; r < length; r++) {
    for (let c = 0; c < length; c++) {
      if (board[r][c] !== "P") continue;
      if (!check(board, r, c)) return 0;
    }
  }
  return 1;
}

function solution(places) {
  return places.map((board) => bfs(board));
}
