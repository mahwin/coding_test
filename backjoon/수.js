const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const getChe = (K) => {
  const len = 10 ** K;
  const result = Array.from({ length: len }, () => true);
  result[0] = false;
  result[1] = false;
  for (let i = 0; i < len; i++) {
    if (!result[i]) continue;
    for (let j = i + i; j < len; j += i) {
      result[j] = false;
    }
  }
  return result;
};

const solution = () => {
  const [K, M] = input.split(" ").map(Number);
  const che = getChe(K);
  const len = 10 ** K;

  let v = Array.from({ length: 10 }, () => false);
  let cnt = 0;

  const check = (num) => {
    const addCheck = (num) => {
      for (let i = 0; i < num; i++) {
        if (che[i] && che[num - i] && i !== num - i) return true;
      }
      return false;
    };

    const mulCheck = (num) => {
      // 나누어 떨어지지 않을 때까지
      while (num % M === 0) {
        num /= M;
      }

      for (let i = 2; i < num; i++) {
        if (num % i !== 0) continue;
        if (che[i] && che[num / i]) return true;
      }
      return false;
    };

    if (addCheck(num) && mulCheck(num)) return true;
    return false;
  };

  const dfs = (depth, tmp) => {
    if (depth === K) {
      const num = Number(tmp);
      if (num.toString().length === K) {
        cnt += check(num) ? 1 : 0;
        return;
      }
    }
    for (let i = 0; i < 10; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(depth + 1, tmp + i);
      v[i] = false;
    }
  };
  dfs(0, "");
  return cnt;
};

input = "5 3";

console.log(solution());
