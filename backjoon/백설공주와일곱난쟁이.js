let input = `20
21
19
1
2
4
25
26
22`.split("\n");

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution() {
  const nums = input.map((el) => Number(el));
  const sum = nums.reduce((a, c) => (a += c), 0);

  for (let i = 0; i < 10; i++) {
    for (let j = i + 1; j < 10; j++) {
      if (sum - nums[i] - nums[j] === 100) {
        console.log(
          nums.filter((el) => nums[i] !== el && nums[j] !== el).join("\n")
        );
        return;
      }
    }
  }
}

solution();
