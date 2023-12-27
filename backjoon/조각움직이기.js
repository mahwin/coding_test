let input = `.....
..**.
.....
...*.
.....`.split("\n");

let result = Infinity;
const targetArr = [];
const length = 5;
let pers;

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 5 || c >= 5) return false;
  return true;
};

const counter = () => {
  let cnt = 0;
  for (let r = 0; r < length; r++) {
    for (let c = 0; c < length; c++) {
      if (input[r][c] == "*") {
        targetArr.push([r, c]);
        cnt++;
      }
    }
  }
  return cnt;
};

const makeBoard = (target) => {
  const board = Array.from({ length }, () =>
    Array.from({ length }, () => false)
  );
  pers = permutation(target);

  const check = () => {
    const v = Array.from({ length }, () => Array.from({ length }, () => false));
    for (let r = 0; r < length; r++) {
      for (let c = 0; c < length; c++) {
        if (board[r][c]) {
          let tmpCnt = 1;
          const q = [[r, c]];
          v[r][c] = true;
          while (q.length) {
            const [x, y] = q.shift();
            for (const d of dirs) {
              const nx = x + d[0];
              const ny = y + d[1];
              if (isValid(nx, ny) && board[nx][ny] && !v[nx][ny]) {
                v[nx][ny] = true;
                q.push([nx, ny]);
                tmpCnt++;
              }
            }
          }
          if (tmpCnt === target) return true;
          return false;
        }
      }
    }
    return false;
  };

  const dfs = (nextIdx, cnt, route) => {
    if (cnt === target) {
      if (check()) {
        cntLink(route, target);
      }
      return;
    }
    for (let i = nextIdx; i < 25; i++) {
      const r = Math.floor(i / 5);
      const c = i - r * 5;
      board[r][c] = true;
      dfs(i + 1, cnt + 1, [...route, [r, c]]);
      board[r][c] = false;
    }
  };
  dfs(0, 0, []);
};

const getDis = (arr1, arr2) => {
  return Math.abs(arr1[0] - arr2[0]) + Math.abs(arr1[1] - arr2[1]);
};

const cntLink = (route) => {
  pers.forEach((per) => {
    let tmp = 0;
    for (let i = 0; i < per.length; i++) {
      tmp += getDis(route[per[i]], targetArr[i]);
    }
    result = Math.min(result, tmp);
  });
};

function permutation(길이) {
  const 결과 = [];

  function 순열조합(현재순열, 남은배열) {
    if (현재순열.length === 길이) {
      결과.push([...현재순열]);
    } else {
      for (let i = 0; i < 남은배열.length; i++) {
        const 새로운순열 = 현재순열.concat(남은배열[i]);
        const 남은요소 = [...남은배열.slice(0, i), ...남은배열.slice(i + 1)];
        순열조합(새로운순열, 남은요소);
      }
    }
  }

  순열조합(
    [],
    Array.from({ length: 길이 }, (_, i) => i)
  );

  return 결과;
}

const solution = () => {
  const cnt = counter();
  makeBoard(cnt);
  console.log(result);
};

solution();
