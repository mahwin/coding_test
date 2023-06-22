let input = `6
5 4 3 2 3 4
4 3 2 3 4 5
3 2 9 5 6 6
2 1 2 3 4 5
3 2 1 6 5 4
6 6 6 6 6 6`.split("\n");

const n = Number(input.shift());
const board = input.map((el) => el.split(" ").map(Number));

const isValid = (r, c, n) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};
const findFish = (shark, n) => {
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  const [r, c, size, _] = shark;
  let distance;
  let [finR, finC] = [n - 1, n - 1];
  v[r][c] = true;
  const queue = [[r, c, 0]]; // row, col, 이동거리
  while (queue.length) {
    const [row, col, cnt] = queue.shift();
    if (distance && distance < cnt) break;
    for (const d of dirs) {
      const nr = d[0] + row;
      const nc = d[1] + col;
      if (isValid(nr, nc, n) && !v[nr][nc] && board[nr][nc] <= size) {
        if (0 < board[nr][nc] && board[nr][nc] < 9 && board[nr][nc] < size) {
          if (!distance) {
            distance = cnt + 1;
            [finR, finC] = [nr, nc];
          } else if (distance < cnt + 1) {
            continue;
          } else if (nr < finR) {
            [finR, finC] = [nr, nc];
          } else if (nr === finR) {
            finC = Math.min(finC, nc);
          }
        }
        v[nr][nc] = true;
        queue.push([nr, nc, cnt + 1]);
      }
    }
  }

  if (distance !== undefined) return [finR, finC, distance];
  else return [];
};
function solution(n, board) {
  let shark = []; // row,col,크기, 현재 크기에서 먹은 물고기 수
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] == 9) {
        shark = [r, c, 2, 0];
        board[r][c] = 0;
      }
    }
  }

  let result = 0;
  while (true) {
    const info = findFish(shark, n);
    if (!info.length) return result;
    const [fr, fc, distance] = info;
    board[fr][fc] = 0;
    result += distance;
    if (shark[3] + 1 === shark[2]) {
      // 사이즈가 커지는 경우
      shark = [fr, fc, shark[2] + 1, 0];
    } else shark = [fr, fc, shark[2], shark[3] + 1];
    // console.log("-----------");
    // console.log(info);
    // board[fr][fc] = 9;
    // console.log(result);
    // console.log("level :", shark[2]);
    // board.forEach((rowInfo) => console.log(rowInfo.join("")));
    // board[fr][fc] = 0;
    // console.log("-----------");
  }
}

console.log(solution(n, board));
