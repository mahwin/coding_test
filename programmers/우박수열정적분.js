function solution(k, ranges) {
  const arr = [k];
  const squareArr = [0]; // i 번째 값은 0~i까지의 합.
  while (k !== 1) {
    k = k % 2 == 0 ? k / 2 : k * 3 + 1;
    arr.push(k);
  }
  for (let i = 0; i < arr.length - 1; i++) {
    squareArr.push(
      squareArr.at(-1) + Number(((arr[i] + arr[i + 1]) / 2).toFixed(1))
    );
  }
  let result = [];

  ranges.forEach(([s, e]) => {
    e = squareArr.length + e - 1;
    if (s > e) result.push(-1);
    else if (s === e) result.push(0);
    else {
      result.push(squareArr[e] - squareArr[s]);
    }
  });
  return result;
}
