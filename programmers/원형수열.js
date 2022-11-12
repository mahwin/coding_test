function solution(want, number, discount) {
  let answer = 0;
  let wantObj = {};
  want.forEach((w, idx) => (wantObj[w] = number[idx]));
  return wantObj;
}
