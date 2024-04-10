function solution(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (stack.length === 0) {
      stack.push(char);
      continue;
    }

    if (stack.at(-1) === char) {
      stack.pop();
      continue;
    }
    stack.push(char);
  }

  return stack.length === 0 ? 1 : 0;
}
