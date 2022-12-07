function solution(n, left, right) {
  let answer = [];

  const idxToNum = (idx, n) => {
    const init = Math.floor(idx / n) + 1;
    const remainer = Math.floor(idx % n) + 1;
    if (remainer > init) {
      return remainer;
    } else {
      return init;
    }
  };
  for (let idx = left; idx < right + 1; idx++) {
    answer.push(idxToNum(idx, n));
  }

  return answer;
}

solution(4, 7, 14);
