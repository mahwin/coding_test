const fs = require("fs");
// let input = Number(fs.readFileSync("/dev/stdin").toString());

const getSqrtArr = (num) => {
  const sqrtArr = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    sqrtArr.push(i ** 2);
  }

  return sqrtArr;
};

const solution = (num) => {
  const sqrtArr = getSqrtArr(num).reverse();
  const length = sqrtArr.length;
  let result = 4;
  const dfs = (next, tmp, depth) => {
    for (let i = next; i < length; i++) {
      if (tmp + sqrtArr[i] === num) {
        result = Math.min(result, depth + 1);
      } else if (tmp + sqrtArr[i] < num && depth + 1 < 4) {
        dfs(next + 1, tmp + sqrtArr[i], depth + 1);
      }
    }
  };
  dfs(0, 0, 0);
  return result;
};

console.log(solution(11339));
