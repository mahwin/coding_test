//같은 수 여러번 고르기
//오름 차순

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `4 4
1231 1232 1233 1234`.split("\n");
const parser = (info) => info.split(" ").map(Number);

const solution = () => {
  const [n, m] = parser(input[0]);
  const nums = parser(input[1]).sort((a, b) => a - b);
  let result = [];
  const dfs = (cnt, node, tmp) => {
    if (cnt === m) {
      result += tmp.join(" ") + "\n";
      return;
    }
    for (let i = node; i < n; i++) {
      dfs(cnt + 1, i, tmp.concat(nums[i]));
    }
  };

  dfs(0, 0, []);
  console.log(result.trim());
};

solution();
