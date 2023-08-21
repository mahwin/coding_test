// 1 방향의 어떻게 선택할지는 그리디 와 완탐 사이에서 고민함
//  그리디는 지금 내리는 결정이 추후에도 최적의 결정이어야하지만
// 뒤 따르는 방향에 따라서 최적이 아닐수도 있음 그래서 완탐을 선택하기로함. 횟수도 5회라서 4**5라서 천 번만 돌면됨!!

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 초기 변수 선언
let input = []; // 입력 값 저장
let n; // 보드 크기
let result = 0; // 결과 값 저장
let tmp = []; // dfs 돌면서 어떤 방향으로 굴릴지 저장 // 0 북 1 동 2 남 3 서
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]; // 이동시킯 방향

rl.on("line", function (line) {
  input.push(line.split(" ").map(Number));
}).on("close", function () {
  solution(input);
  console.log(result);
});

const simulation = (ds) => {
  let copy = input.map((el) => [...el]);

  for (const d of ds) {
    let tmpCopy = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => 0)
    );

    if (d === 0) {
      for (let c = 0; c < n; c++) {
        let stack = [];
        let pre = 0;
        for (let r = 0; r < n; r++) {
          if (copy[r][c] == 0) continue;
          else if (pre == copy[r][c]) {
            stack.push(stack.pop() * 2);
            pre = 0; // 벌써 합쳤는데 또 뒤 따르는 숫자가 같아서 두 번 합쳐길 경우를 방지하기 위해서!!
          } else {
            stack.push(copy[r][c]);
            pre = copy[r][c];
          }
        }
        stack.forEach((num, i) => {
          tmpCopy[i][c] = num;
        });
      }
    } else if (d === 1) {
      for (let r = 0; r < n; r++) {
        let stack = [];
        let pre = 0;
        for (let c = n - 1; c >= 0; c--) {
          if (copy[r][c] == 0) continue;
          else if (pre == copy[r][c]) {
            stack.push(stack.pop() * 2);
            pre = 0; // 벌써 합쳤는데 또 뒤 따르는 숫자가 같아서 두 번 합쳐길 경우를 방지하기 위해서!!
          } else {
            stack.push(copy[r][c]);
            pre = copy[r][c];
          }
        }

        stack.forEach((num, i) => {
          tmpCopy[r][n - 1 - i] = num;
        });
      }
    } else if (d === 2) {
      for (let c = 0; c < n; c++) {
        let stack = [];
        let pre = 0;
        for (let r = n - 1; r >= 0; r--) {
          if (copy[r][c] == 0) continue;
          else if (pre == copy[r][c]) {
            stack.push(stack.pop() * 2);
            pre = 0; // 벌써 합쳤는데 또 뒤 따르는 숫자가 같아서 두 번 합쳐길 경우를 방지하기 위해서!!
          } else {
            stack.push(copy[r][c]);
            pre = copy[r][c];
          }
        }
        stack.forEach((num, i) => {
          tmpCopy[n - 1 - i][c] = num;
        });
      }
    } else if (d === 3) {
      for (let r = 0; r < n; r++) {
        let stack = [];
        let pre = 0;
        for (let c = 0; c < n; c++) {
          if (copy[r][c] == 0) continue;
          else if (pre == copy[r][c]) {
            stack.push(stack.pop() * 2);
            pre = 0; // 벌써 합쳤는데 또 뒤 따르는 숫자가 같아서 두 번 합쳐길 경우를 방지하기 위해서!!
          } else {
            stack.push(copy[r][c]);
            pre = copy[r][c];
          }
        }
        stack.forEach((num, i) => {
          tmpCopy[r][i] = num;
        });
      }
    }

    copy = tmpCopy;
  }

  // 최댓값 갱신!
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] > result) result = copy[r][c];
    }
  }
};

const dfs = (node) => {
  if (node === 5) {
    simulation(tmp);
    return;
  }
  for (let i = 0; i < 4; i++) {
    tmp.push(i);
    dfs(node + 1);
    tmp.pop(i);
  }
};

const solution = (input) => {
  n = Number(input.shift());
  dfs(0);
};
