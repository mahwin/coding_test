const counter = (board) => {
  let cnts = [0, 0];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "O") cnts[0]++;
      else if (board[i][j] === "X") cnts[1]++;
    }
  }
  return cnts;
};

const findWinners = (board) => {
  const winners = new Set();
  //가로 체크
  for (let r = 0; r < 3; r++) {
    if (board[r][0] === ".") continue;
    let init = board[r][0];
    let cnt = 1;
    for (let c = 1; c < 3; c++) {
      if (init === board[r][c]) cnt++;
      else break;
    }
    if (cnt === 3) winners.add(init);
  }

  //세로 체크
  for (let c = 0; c < 3; c++) {
    if (board[0][c] === ".") continue;
    let init = board[0][c];
    let cnt = 1;
    for (let r = 1; r < 3; r++) {
      if (init === board[r][c]) cnt++;
      else break;
    }
    if (cnt === 3) winners.add(init);
  }
  // 대각 선 체크
  if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O")
    winners.add("O");
  if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O")
    winners.add("O");
  if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X")
    winners.add("X");
  if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X")
    winners.add("X");
  return [...winners];
};

function solution(board) {
  // 갯수로 판별하는 경우.
  // 선공 수 < 후공 수.
  // 갯수의 차이가 1초과인 경우
  const [o, x] = counter(board);

  if (o < x || o - x > 1) return 0;

  // 승패와 관련
  const winners = findWinners(board);

  // 승자가 두명인 경우
  if (winners.length === 2) return 0;
  // 승자가 후공인데 선공 수와 후공 수가 같은 경우
  if (winners[0] === "X" && o > x) return 0;
  // 승자가 선공인데 선공 수와 후공 수가 같은 경우
  if (winners[0] === "O" && o === x) return 0;
  return 1;
}
