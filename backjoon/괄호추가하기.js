// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `19
1*2+3*4*5-6*7*8*9*9`.split("\n");

const cal = (oper, num1, num2) => {
  switch (oper) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
  }
};

function solution() {
  const n = Number(input.shift());
  const arr = input[0].split("");
  let max = -Infinity;

  const nums = []; // 숫자 저장
  const opers = []; // 연산자 저장

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) nums.push(Number(arr[i]));
    else opers.push(arr[i]);
  }

  const dfs = (node, acc) => {
    if (node === nums.length - 1) {
      max = Math.max(max, acc);
      return;
    }
    //일반적인 연산
    dfs(node + 1, cal(opers[node], acc, nums[node + 1]));
    //뒤에 연산자를 기준으로 괄호해서 먼저 연산되게
    if (node + 2 <= nums.length - 1) {
      dfs(
        node + 2,
        cal(
          opers[node],
          acc,
          cal(opers[node + 1], nums[node + 1], nums[node + 2])
        )
      );
    }
  };

  dfs(0, nums[0]);
  console.log(max);
}

solution();
