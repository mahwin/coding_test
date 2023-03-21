const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const board = [];
  const n = input[0];
  for (let i = 1; i <= n; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  let pick = n / 2;
  const totalArr = Array.from({ length: n }, (_, i) => i);
  const combis = getCombination(totalArr, pick);

  let min = Infinity;
  for (const joArr of combis) {
    const moArr = totalArr.filter((el) => !joArr.includes(el));
    let joScore = cal(board, joArr);
    let moScore = cal(board, moArr);
    let total = Math.abs(joScore - moScore);

    min = Math.min(total, min);
  }
  console.log(min);

  process.exit();
});

function cal(board, arr) {
  let score = 0;
  let v = Array.from({ length: arr.length }, () => false);
  let roots = [];

  const dfs = (cnt, root) => {
    if (cnt === 2) return roots.push(root);
    for (let i = 0; i < arr.length; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(cnt + 1, [...root, i]);
      v[i] = false;
    }
  };

  dfs(0, []);

  for (let root of roots) {
    const [f, b] = [arr[root[0]], arr[root[1]]];
    score += board[f][b];
  }
  return score;
}

function getCombination(arr, pick) {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];
  arr.forEach((fixed, index) => {
    tmp = getCombination(arr.slice(index + 1), pick - 1);
    tmp.forEach((el) => result.push([fixed, ...el]));
  });
  return result;
}
