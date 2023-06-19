const OPERERATOR = ["+", "-", "*"];
const parser = (string) => {
  const arr = [];

  let tmp = "";
  for (let i = 0; i < string.length; i++) {
    const cur = string[i];
    if (cur.match(/[\+\-\*]/)) {
      arr.push(Number(tmp));
      arr.push(cur);
      tmp = "";
    } else tmp += cur;
  }
  arr.push(Number(tmp));
  return arr;
};

const cal = (opers, arr) => {
  let copy = [...arr];

  for (let oper of opers) {
    for (let i = 0; i < copy.length; i++) {
      if (copy[i] == oper) {
        const tmp = eval(`${copy[i - 1]} ${copy[i]} ${copy[i + 1]}`);
        copy = [...copy.slice(0, i - 1), tmp, ...copy.slice(i + 2)];
        i -= 2;
      }
    }
  }
  return Math.abs(copy[0]);
};

function solution(expression) {
  let result = -Infinity;
  const splitArr = parser(expression);

  // dfs 돌면서 순열 생성
  const v = Array.from({ length: 3 }, () => false);
  const dfs = (tmp) => {
    if (tmp.length == 3) {
      result = Math.max(cal(tmp, splitArr), result);
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(tmp.concat(OPERERATOR[i]));
      v[i] = false;
    }
  };

  dfs([]);

  return result;
}
