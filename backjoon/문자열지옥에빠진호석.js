// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `3 3 2
aaa
aba
aaa
aa
bb`.split("\n");
function solution() {
  const [n, m, k] = input.shift().split(" ").map(Number);

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const dictionaryObj = new Map();

  const dfs = (row, col, tmp) => {
    dictionaryObj.set(tmp, (dictionaryObj.get(tmp) || 0) + 1); // 현재 키 값에 해당하는 값이 없으면 0

    if (tmp.length == 5) return; //종료조건 신이 좋아하는 문자열의 길이 1~5

    for (let i = 0; i < 8; i++) {
      //환형 좌표계 표현. 음수값 처리하기 위해 + len해서 양수로 바꿔줌.
      const nr = (row + dirs[i][0] + n) % n;
      const nc = (col + dirs[i][1] + m) % m;
      // 끝이 처음과 연결되어 있어서 경계 체크 x
      dfs(nr, nc, tmp + input[nr][nc]);
    }
  };

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      dfs(row, col, input[row][col]);
    }
  }
  let result = [];
  for (let i = 0; i < k; i++) {
    result.push(dictionaryObj.get(input[n + i]) || 0);
  }
  console.log(result.join("\n"));
}

solution();
