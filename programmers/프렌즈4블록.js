const dirs = [
  [0, 1],
  [1, 0],
  [1, 1],
]; //오 아래 대각

// const isValid = (r,c,m,n)=>{
//     if(r>=m||c>=n|| r<0 || c<0) return false;
//     else return true;
// }

//지워질 블록 찾기
const find = (board, m, n) => {
  let pos = [];
  for (let r = 0; r < m - 1; r++) {
    for (let c = 0; c < n - 1; c++) {
      if (board[r][c] === ".") continue;
      let samePos = [[r, c]];
      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];
        if (board[nr][nc] === board[r][c]) samePos.push([nr, nc]);
        else break;
      }
      if (samePos.length === 4) pos.push(...samePos);
    }
  }
  return pos;
};

const unique = (arr) => {
  let set = new Set();
  arr.forEach(([r, c]) => set.add([r, c].join(",")));
  return [...set].map((el) => el.split(",").map(Number));
};

// 전략
// 지울 부분에 .을 넣고 위에서부터 col 기준으로 아래 row부터 확인하고

const down = (board, pos, m, n) => {
  pos.forEach(([r, c]) => (board[r][c] = "."));
  for (let c = 0; c < n; c++) {
    let colInfo = "";
    for (let r = 0; r < m; r++) {
      if (board[r][c] !== ".") colInfo += board[r][c];
    }
    colInfo = colInfo.padStart(m, ".");
    for (let r = 0; r < m; r++) {
      board[r][c] = colInfo[r];
    }
  }
};

function solution(m, n, board) {
  let cnt = 0;
  board = board.map((el) => el.split(""));

  while (true) {
    const possible = find(board, m, n); // 지울 수 있는 배열 리턴하는 함수 호출
    const uniquePos = unique(possible); // 중복 제외
    if (uniquePos.length == 0) return cnt; // 지울 수 있는 배열이 없다면 리턴
    cnt += uniquePos.length;
    down(board, uniquePos, m, n); // 지울 수 있는 블록 지우고 위에 블록 아래로
  }
}
