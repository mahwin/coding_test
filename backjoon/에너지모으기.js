const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `7
2 2 7 6 90 5 9`.split("\n");

const solution = () => {
  const n = Number(input.shift());
  input = input[0].split(" ").map(Number);

  const v = Array.from({ length: n }, () => false);

  const cal = (idx) => {
    let count = 0;

    for (let i = idx - 1; i >= 0; i--) {
      if (!v[i]) {
        count = input[i];
        break;
      }
    }
    for (let j = idx + 1; j < n; j++) {
      if (!v[j]) {
        return count * input[j];
      }
    }
  };
  let result = 0;
  const dfs = (acc, cnt) => {
    if (cnt === n - 2) {
      result = Math.max(result, acc);
      return;
    }
    for (let i = 1; i < n - 1; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(acc + cal(i), cnt + 1);
      v[i] = false;
    }
  };
  dfs(0, 0);
  console.log(result);
};

solution();
