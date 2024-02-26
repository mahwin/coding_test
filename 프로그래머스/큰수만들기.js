function solution(number, k) {
  const stack = [];

  number = number.split("").map(Number);

  for (let i = 0; i < number.length; i++) {
    const curNum = number[i];

    if (!stack.length) {
      stack.push(curNum);
      continue;
    }

    while (stack.length && stack.at(-1) < curNum && k !== 0) {
      stack.pop();
      k--;
    }
    stack.push(curNum);
  }
  console.log(k, number.length);
  return stack.join("").slice(0, stack.length - k);
}
