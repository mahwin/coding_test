const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let input = `6
// 3
// 72
// 2
// 12
// 7
// 2
// 1`.split("\n");

const solution = () => {
  const n = Number(input.shift());
  const pick = Number(input.shift());
  let arr = [];

  let answer = new Set();
  const visited = new Array(n).fill(false);
  const tmp = [];

  const getPermutation = (n, pick, nextIdx) => {
    if (arr.length === pick) {
      answer.add(arr.join(""));
      return;
    }

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      arr.push(input[i]);
      getPermutation(n, pick);
      visited[i] = false;
      arr.pop();
    }
  };

  getPermutation(n, pick);
  return answer.size;
};

console.log(solution());
