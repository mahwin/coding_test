let input = `2
4 3 2 1 0 4 3 2 1
1 2 3 4 1 2 3 4 0`.split("\n");

let n, v; // 이닝 수, 방문 체크
let board = []; // 이닝 마다 선수의 결과
let max = -Infinity; // 얻을 수 있는 점수 저장.
const players = []; // 선수들의 선수

const getScore = () => {
  const p = [...players.slice(0, 3), 0, ...players.slice(3)];

  let score = 0;
  let pIdx = 0; // 타석에 있는 선수
  for (let ining = 0; ining < n; ining++) {
    let [base1, base2, base3] = [0, 0, 0];
    let out = 0; // 아웃된 타자 수
    while (out !== 3) {
      switch (board[ining][p[pIdx]]) {
        case 0:
          out++;
          break;
        case 1:
          score += base3;
          base3 = base2;
          base2 = base1;
          base1 = 1;
          break;
        case 2:
          score += base3 + base2;
          base3 = base1;
          base2 = 1;
          base1 = 0;
          break;
        case 3:
          score += base3 + base2 + base1;
          base1 = base2 = 0;
          base3 = 1;
          break;
        case 4:
          score += base3 + base2 + base1 + 1;
          base1 = base2 = base3 = 0;
          break;
      }
      pIdx = pIdx + 1 > 8 ? 0 : pIdx + 1;
    }
  }

  return score;
};

const dfs = () => {
  if (players.length === 8) {
    max = Math.max(max, getScore());
    return;
  }
  // i=0은 고정석
  for (let i = 1; i < 9; i++) {
    if (v[i]) continue;
    v[i] = true;
    players.push(i);
    dfs();
    v[i] = false;
    players.pop();
  }
};

const solution = () => {
  //초기 값
  n = Number(input[0]);
  for (let i = 1; i <= n; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  v = Array.from({ length: 9 }, () => false);
  // 1번 주자가 4번 주자로 고정
  dfs();
  return max;
};

console.log(solution());
