function solution(input_string) {
  let stack = [];
  for (let i = 0; i < input_string.length; i++) {
    const alpha = input_string[i];
    if (!stack.length) {
      stack.push(alpha);
      continue;
    }
    if (stack[stack.length - 1] !== alpha) stack.push(alpha);
  }
  let alphaObj = {};

  stack.forEach((al) => {
    alphaObj[al] = alphaObj[al] ? alphaObj[al] + 1 : 1;
  });
  const result = [];

  for (let [key, val] of Object.entries(alphaObj)) {
    if (val > 1) result.push(key);
  }
  return result.length === 0 ? "N" : result.sort().join("");
}
