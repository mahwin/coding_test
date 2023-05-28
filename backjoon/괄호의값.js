let input = `()]()`;

const solution = () => {
  let stack = [];
  for (let i = 0; i < input.length; i++) {
    const cur = input[i];
    //스택이 비었거나 여는 괄호면 스택에 저장
    if (!stack.length || cur == "(" || cur == "[") {
      stack.push(cur);
      continue;
    }
    if (cur === ")") {
      if (stack.at(-1) === "(") {
        stack.pop();
        stack.push(2);
        continue;
      }
      let flag = false;
      for (let j = stack.length - 1; j > -1; j--) {
        if (stack[j] === "(") {
          for (let k = j + 1; k < stack.length; k++) {
            if (Number.isInteger(stack[k])) {
              flag = true;
              stack[k] *= 2;
            }
          }
          stack.splice(j, 1);
          break;
        }
      }
      if (!flag) return 0;
    } else {
      if (stack.at(-1) === "[") {
        stack.pop();
        stack.push(3);
        continue;
      }
      let flag = false;
      for (let j = stack.length - 1; j > -1; j--) {
        if (stack[j] === "[") {
          for (let k = j; k < stack.length; k++) {
            if (Number.isInteger(stack[k])) {
              flag = true;
              stack[k] *= 3;
            }
          }
          stack.splice(j, 1);
          break;
        }
      }
      if (!flag) return 0;
    }
  }
  const sum = stack.reduce((p, c) => (p += c));
  return Number.isInteger(sum) ? sum : 0;
};

console.log(solution());
// (()[[]])([])
//
