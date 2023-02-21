function solution(number, k) {
  let stack = [];
  for (let i = 0; i < number.length; i++) {
    let char = Number(number[i]);
    if (stack.length === 0) {
      stack.push(char);
      continue;
    }
    while (stack[stack.length - 1] < char) {
      stack.pop();
      k--;
      if (!k) return stack.join("") + number.slice(i);
    }
    stack.push(char);
  }
  return stack.join("").slice(0, stack.length - k);
}
