function solution(k, score) {
  let answer = [];
  let honorArr = [];
  for (let s of score) {
    if (honorArr.length < k) {
      honorArr.push(s);
      honorArr.sort((a, b) => b - a);
      answer.push(honorArr[honorArr.length - 1]);
    } else {
      if (honorArr[k - 1] >= s) {
        answer.push(honorArr[k - 1]);
        continue;
      }
      for (let idx = 0; idx < k; idx++) {
        if (s >= honorArr[idx]) {
          if (idx === 0) {
            honorArr = [s, ...honorArr.slice(0, k - 1)];
          } else if (idx === k - 1) {
            honorArr = [...honorArr.slice(0, k - 1), s];
          } else {
            honorArr = [
              ...honorArr.slice(0, idx),
              s,
              ...honorArr.slice(idx, k - 1),
            ];
          }
          break;
        }
      }
      answer.push(honorArr[k - 1]);
    }
  }
  return answer;
}

console.log(solution(3, [10, 100, 20, 150, 1, 100, 200]));
