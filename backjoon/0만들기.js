let input = `4
3
7
5
6`.split("\n");

// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const operators = ["+", " ", "-"];
let tmp = [];
let result = [];

const cal = (len) => {
  let sic = [];
  for (let i = 1; i <= len; i++) {
    sic.push(i);
    sic.push(tmp[i - 1]);
  }
  sic.pop();

  let key = sic.join("");
  let score = eval(key.replaceAll(" ", ""));
  if (score == 0) result.push(key);
};

const dfs = (node, len) => {
  if (node === len - 1) {
    cal(len);
    return;
  }

  for (let i = 0; i < 3; i++) {
    tmp.push(operators[i]);
    dfs(node + 1, len);
    tmp.pop();
  }
};

const solution = () => {
  const map = new Map();
  const n = Number(input.shift());
  for (let i = 0; i < n; i++) {
    const len = Number(input[i]);

    if (map.has(len)) continue;
    else {
      dfs(0, len);
      map.set(len, result.sort().join("\n"));
      result = [];
    }
  }
  let answer = "";
  for (let i = 0; i < n; i++) {
    const len = Number(input[i]);
    answer += map.get(len) + "\n";
    answer += "\n";
  }
  console.log(answer.trim());
};

solution();
