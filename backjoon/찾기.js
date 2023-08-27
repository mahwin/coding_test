const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = ` ABC
ABC`.split("\n");

const getTable = (patten) => {
  const length = patten.length;
  const result = Array.from({ length }, () => 0);
  let j = 0;
  for (let i = 1; i < length; i++) {
    while (j > 0 && patten[i] != patten[j]) {
      j = result[j - 1];
    }
    if (patten[i] === patten[j]) {
      result[i] = ++j;
    }
  }
  return result;
};

const solution = () => {
  let result = { cnt: 0, indexs: [] };
  const T = input[0];
  const P = input[1];
  const KMP = getTable(P);
  let j = 0;
  for (let i = 0; i < T.length; i++) {
    while (j > 0 && T[i] != P[j]) {
      j = KMP[j - 1];
    }
    if (T[i] === P[j]) {
      if (j + 1 === P.length) {
        result.cnt++;
        result.indexs.push(i - P.length + 2);
        j = KMP[j];
      } else {
        j++;
      }
    }
  }
  console.log(result.cnt);
  console.log(result.indexs.join(" "));
};

solution();
