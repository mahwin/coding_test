const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();

function solution(input) {
  input = input.split("\n");
  const N = Number(input[0]);
  let stuObj = new Map();
  for (let i = 1; i <= N ** 2; i++) {
    const el = input[i].split(" ");
    stuObj.set(el[0], el.slice(1).map(Number));
  }
  const board = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => null)
  );

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= N || c >= N) return false;
    return true;
  };

  for (const key of stuObj.keys()) {
    let maxLikeCnt = 0;
    let liked = stuObj.get(key);
    let possible = [];
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col]) continue;
        let likeCnt = 0;
        let blankCnt = 0;
        for (const dir of dirs) {
          const nr = row + dir[0];
          const nc = col + dir[1];
          if (isValid(nr, nc)) {
            if (liked.includes(Number(board[nr][nc]))) likeCnt++;
            else if (board[nr][nc] === null) blankCnt++;
          }
        }

        if (maxLikeCnt < likeCnt) {
          maxLikeCnt = likeCnt;
          possible = [[row, col, blankCnt]];
        } else if (maxLikeCnt === likeCnt) {
          possible.push([row, col, blankCnt]);
        }
      }
    }
    if (possible.length === 1) {
      const [r, c, _] = possible[0];
      board[r][c] = key;
    } else {
      possible.sort((a, b) => {
        if (a[2] !== b[2]) return b[2] - a[2];
        else if (a[0] !== b[0]) return a[0] - b[0];
        else return a[1] - b[1];
      });
      const [r, c, _] = possible[0];
      board[r][c] = key;
    }
  }

  const countLiked = (board, stuObj) => {
    let answer = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        key = board[row][col];
        let likeCnt = 0;
        for (const dir of dirs) {
          const nr = row + dir[0];
          const nc = col + dir[1];
          if (isValid(nr, nc)) {
            if (stuObj.get(key).includes(Number(board[nr][nc]))) likeCnt++;
          }
        }

        if (likeCnt === 0) answer += 0;
        else if (likeCnt === 1) answer += 1;
        else if (likeCnt === 2) answer += 10;
        else if (likeCnt === 3) answer += 100;
        else if (likeCnt === 4) answer += 1000;
      }
    }
    return answer;
  };
  return countLiked(board, stuObj);
}

console.log(solution(input));

// 4	2, 5, 1, 7
// 3	1, 9, 4, 5
// 9	8, 1, 2, 3
// 8	1, 9, 3, 4
// 7	2, 3, 4, 8
// 1	9, 2, 5, 7
// 6	5, 2, 3, 4
// 5	1, 9, 2, 8
// 2	9, 3, 1, 4
