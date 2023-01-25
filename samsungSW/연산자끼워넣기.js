let input = `2
-7 6
0 0 0 1`.split("\n");

const N = Number(input[0]);
const operators = input[2].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

let max = -Infinity;
let min = Infinity;

const calculate = (result, operator, num) => {
  if (operator === 0) {
    result += num;
  } else if (operator === 1) {
    result -= num;
  } else if (operator === 2) {
    result *= num;
  } else if (result < 0) {
    result = -Math.floor(-result / num);
  } else {
    result = Math.floor(result / num);
  }

  return result;
};

const dfs = (cnt, result) => {
  if (cnt + 1 === N) {
    max = Math.max(max, result);
    min = Math.min(min, result);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (!operators[i]) continue;
    operators[i]--;
    dfs(cnt + 1, calculate(result, i, nums[cnt + 1]));
    operators[i]++;
  }
};

dfs(0, nums[0]);
console.log(max === 0 ? 0 : max);
console.log(min === 0 ? 0 : min);
