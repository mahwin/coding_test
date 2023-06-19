const LEN = 11;

const diffSocre = (ap, ry) => {
  let r = 0;
  let a = 0;
  for (let i = 0; i < LEN - 1; i++) {
    if (ap[i] == 0 && ry[i] == 0) continue;
    else if (ap[i] < ry[i]) r += 10 - i;
    else a += 10 - i;
  }
  return r - a;
};

const lastBigger = (oldArr, newArr) => {
  for (let i = LEN - 1; i >= 0; i--) {
    if (oldArr[i] === newArr[i]) continue;
    else if (oldArr[i] > newArr[i]) return [...oldArr];
    else return [...newArr];
  }
};

function solution(n, info) {
  let result = [-1];
  let scoreDiff = -1;
  const ryan = [];

  const dfs = (remain) => {
    if (ryan.length == LEN) {
      const score = diffSocre(info, ryan);
      if (score > scoreDiff) {
        scoreDiff = score;
        result = [...ryan];
      } else if (score === scoreDiff) {
        result = lastBigger(result, ryan);
      }
      return;
    }
    for (let i = 0; i <= remain; i++) {
      ryan.push(i);
      dfs(remain - i);
      ryan.pop();
    }
  };
  dfs(n);
  return scoreDiff > 0 ? result : [-1];
}

console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
