function solution(s) {
  const stack = [];
  for (const char of [...s]) {
    if (!stack.length) {
      stack.push(char);
      continue;
    }

    if (char === "(") {
      stack.push(char);
      continue;
    } else if (stack.at(-1) === "(") {
      stack.pop();
    }
  }
  return stack.length ? false : true;
}
