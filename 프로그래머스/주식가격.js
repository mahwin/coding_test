function solution(prices) {
  const result = [];

  const stack = [];

  for (let i = 0; i < prices.length; i++) {
    while (stack.length && stack.at(-1)[0] > prices[i]) {
      const [_, idx] = stack.pop();
      result[idx] = i - idx;
    }

    stack.push([prices[i], i]);
  }
  stack.forEach(([_, idx]) => (result[idx] = prices.length - idx - 1));
  return result;
}
