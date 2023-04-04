const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let answer = 0;
let teamBoard = [];
let board = [];
let tails = [];
let teams = [];
let v = [];
let n, m, k;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

rl.on("line", function (line) {
  input.push(line.trim());
}).on("close", function () {
  [n, m, k] = input[0].split(" ").map(Number);
  v = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
  teamBoard = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );
  let teamInits = [];

  for (let i = 1; i <= n; i++) {
    const info = input[i].split(" ").map(Number);
    board.push(info);
    for (let j = 0; j < n; j++) {
      if (info[j] === 1) teamInits.push([i - 1, j]);
    }
  }
  //팀별 경로 찾기
  for (let i = 0; i < m; i++) {
    teams.push(findRoot(...teamInits[i]));
  }

  // 경로를 기준으로 같은 팀 하나의 팀 숫자 teamBoard에 부여하기
  for (let i = 0; i < m; i++) {
    teams[i].forEach(([r, c]) => (teamBoard[r][c] = i + 1));
  }

  for (let i = 0; i < k; i++) {
    moveAllTeams();

    const heatedTeam = throwBall(i);
    if (heatedTeam) reverseTeam(heatedTeam);
  }
  console.log(answer);
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const findRoot = (initR, initC) => {
  v[initR][initC] = true;
  const roots = [[initR, initC]];
  const queue = [[initR, initC, 1]]; // r,c,board 값
  while (queue.length) {
    const [r, c, val] = queue.shift();
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;

      if (isValid(nr, nc) && !v[nr][nc]) {
        const nextVal = board[nr][nc];
        if (nextVal !== val + 1 && nextVal !== val) continue;
        if (nextVal === 3) tails.push(roots.length + 1);
        v[nr][nc] = true;
        roots.push([nr, nc]);
        queue.push([nr, nc, board[nr][nc]]);
      }
    }
  }
  return roots;
};

const moveAllTeams = () => {
  for (let i = 0; i < m; i++) {
    let tmp = teams[i][teams[i].length - 1];
    for (let j = teams[i].length - 1; j > 0; j--) {
      teams[i][j] = teams[i][j - 1];
    }
    teams[i][0] = tmp;
  }

  //옮긴 좌표를 기준으로 board값 갱신.
  for (let i = 0; i < m; i++) {
    teams[i].forEach(([r, c], j) => {
      if (j === 0) board[r][c] = 1;
      else if (j < tails[i] - 1) board[r][c] = 2;
      else if (j === tails[i] - 1) board[r][c] = 3;
      else board[r][c] = 4;
    });
  }
};
//공을 받은 팀 확인하고 받았으면 그 팀의 순서 뒤집기
const reverseTeam = (teamIdx) => {
  const newTeam = [];
  // 사람들 부터 반대로 넣기
  for (let i = tails[teamIdx - 1] - 1; i > -1; i--) {
    newTeam.push(teams[teamIdx - 1][i]);
  }
  //레일도 뒤집어서 넣기
  for (let i = teams[teamIdx - 1].length - 1; i > tails[teamIdx - 1] - 1; i--) {
    newTeam.push(teams[teamIdx - 1][i]);
  }
  teams[teamIdx - 1] = [...newTeam];
  //보드 수정

  for (let i = 0; i < newTeam.length; i++) {
    const [r, c] = newTeam[i];
    if (i == 0) board[r][c] = 1;
    else if (i < tails[teamIdx - 1] - 1) board[r][c] = 2;
    else if (i == tails[teamIdx - 1] - 1) board[r][c] = 3;
    else board[r][c] = 4;
  }
};

const throwBall = (trials) => {
  const turn = trials % (4 * n);
  if (turn < 1 * n) {
    const row = turn;
    // 1~n       => 왼쪽 -> 오른쪽
    for (let col = 0; col < n; col++) {
      if (board[row][col] >= 1 && board[row][col] < 4) {
        get_score(row, col);
        return teamBoard[row][col];
      }
    }
  } else if (turn < 2 * n) {
    // n+1 ~2n   => 아래 -> 위
    const col = turn - n;
    for (let row = n - 1; row > -1; row--) {
      if (board[row][col] >= 1 && board[row][col] < 4) {
        get_score(row, col);
        return teamBoard[row][col];
      }
    }
  } else if (turn < 3 * n) {
    // 2n+1 ~ 3n => 오른 -> 왼
    const row = 3 * n - turn - 1;
    for (let col = n - 1; col > -1; col--) {
      if (board[row][col] >= 1 && board[row][col] < 4) {
        get_score(row, col);
        return teamBoard[row][col];
      }
    }
  } else if (turn < 4 * n) {
    // 3n+1 ~ 4n => 위   -> 아래
    const col = 4 * n - turn - 1;

    for (let row = 0; row < n; row++) {
      if (board[row][col] >= 1 && board[row][col] < 4) {
        get_score(row, col);
        return teamBoard[row][col];
      }
    }
  }
  return null;
};

const get_score = (row, col) => {
  const teamIdx = teamBoard[row][col];
  teams[teamIdx - 1].forEach(([r, c], idx) => {
    if (r === row && col === c) {
      answer += (idx + 1) * (idx + 1);
      return;
    }
  });
};
