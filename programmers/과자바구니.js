function solution(cookie) {
  let answer = 0;
  let sum = cookie.reduce((pre, cur) => (pre += cur), 0);

  for (let start = 0; start < cookie.length - 1; start++) {
    sum -= cookie[start - 1] || 0;
    let copySum = sum;

    for (let end = cookie.length - 1; end > start; end--) {
      copySum -= cookie[end + 1] || 0;
      if (copySum % 2 !== 0) continue;
      let target = copySum / 2;
      let son = 0;
      if (target <= answer) break;
      for (let c of cookie.slice(start, end)) {
        son += c;
        if (son === target) {
          answer = Math.max(son, answer);
        }
        if (son > target) break;
      }
    }
  }
  return answer;
}

console.log(solution([1, 1, 2, 3]));
