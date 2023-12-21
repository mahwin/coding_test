const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `4
bar
abracadabra
bear
bar
baraxbara`.split("\n");

const solution = () => {
  const N = Number(input[0]);
  const target = input[1];
  let result = 0;
  for (let i = 2; i < 2 + N; i++) {
    const str = input[i];
    if (check(target, str)) result++;
  }
  return result;
};

const check = (targetStr, str) => {
  if (targetStr.length > str.length) return false;
  if (targetStr === str) return true;
  let startIdx, length;
  for (let i = 0; i < str.length; i++) {
    if (targetStr[0] === str[i]) {
      startIdx = i;
      for (let j = i + 1; j < str.length; j++) {
        if (targetStr[1] === str[j]) {
          length = j - i;
          let p = 2;
          for (let k = j + length; k < str.length; k += length) {
            if (targetStr[p] !== str[k]) break;
            p++;
          }
          if (p === targetStr.length) return true;
        }
      }
    }
  }
};

console.log(solution());
