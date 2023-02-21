function solution(numbers) {
  let result = Array.from({ length: numbers.length }, () => -1);
  let stack = [];
  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    if (stack.length === 0) {
      stack.push([num, i]);
      continue;
    }

    while (stack.length > 0 && stack[stack.length - 1][0] < num) {
      [_, idx] = stack.pop();
      result[idx] = num;
    }
    stack.push([num, i]);
  }
  return result;
}
