function solution(prices) {
  let stack = [[prices[0], 0]];
  let result = Array.from({ length: prices.length }, () => 0);
  for (let i = 1; i < prices.length; i++) {
    let curP = prices[i];

    if (stack && stack[stack.length - 1][0] > curP) {
      let deteleArr = [];

      stack.forEach(([p, i], k) => {
        if (p > curP) deteleArr.push(k);
      });
      console.log(deteleArr, "!!");
      deteleArr = deteleArr.reverse();
      deteleArr.forEach((j) => {
        const [i, start] = stack.splice(j, 1)[0];
        result[start] = i - start;
      });
    }
    stack.push([curP, i]);
  }
  const len = prices.length - 1;
  if (stack.length) {
    stack.forEach(([p, t]) => {
      result[t] = len - t;
    });
  }

  return result;
}

console.log(solution([1, 2, 3, 2, 3]));

console.log(solution([1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 1, 2, 3]));
