const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `10
2 -5 2 3 -4 7 -4 0 1 -6`.split("\n");

const solution = () => {
  // 정렬하고
  // 투 포인터로 하면 되지 않을까?
  const n = Number(input[0]);
  let result = 0;
  input = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      const sum = input[i] + input[left] + input[right];
      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        if (input[left] === input[right]) {
          result += combi2(right - left + 1);
          break;
        }
        let leftCnt = 1;
        while (input[left] === input[left + 1]) {
          leftCnt++;
          left++;
        }

        let rightCnt = 1;
        while (input[right] === input[right - 1]) {
          rightCnt++;
          right--;
        }
        result += leftCnt * rightCnt;

        left++;
        right--;
      }
    }
  }
  return result;
};

const combi2 = (totalLen) => {
  return (totalLen * (totalLen - 1)) / 2;
};

console.log(solution());
