function solution(numbers) {
  const n = numbers.length;
  let result = Array.from({ length: n }, () => -1);
  let stack = [];
  for (let i = 0; i < n; i++) {
    const num = numbers[i];
    while (stack.length && stack.at(-1)[1] < num) {
      result[stack.at(-1)[0]] = num;
      stack.pop();
    }
    stack.push([i, num]);
  }

  return result;
}
