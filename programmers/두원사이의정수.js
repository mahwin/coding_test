function solution(r1, r2) {
  let result = 0;

  for (let x = 1; x <= r2; x++) {
    result += possible(x, r1, r2);
  }
  return result * 4;
}

const possible = (x, r1, r2) => {
  let minH;
  if (r1 > x) minH = Math.ceil(Math.sqrt(r1 ** 2 - x ** 2));
  else minH = 0;
  let maxH = Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
  return maxH - minH + 1;
};
