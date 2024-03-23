const comps = ["*+-", "*-+", "-*+", "-+*", "+-*", "+*-"];

function cal(type, num1, num2) {
  if (type === "*") {
    return num1 * num2;
  }

  if (type === "-") {
    return num1 - num2;
  }

  if (type === "+") {
    return num1 + num2;
  }
}

function isDigit(char) {
  if (/[0-9]/.test(char)) return true;
  return false;
}

function parsing(expression) {
  let arr = [];
  let str = "";
  for (let i = 0; i < expression.length; i++) {
    if (isDigit(expression[i])) {
      str += expression[i];
    } else {
      arr.push(Number(str));
      arr.push(expression[i]);
      str = "";
    }
  }
  arr.push(Number(str));
  return arr;
}

function solution(expression) {
  let result = 0;
  const origin = parsing(expression);
  for (const com of comps) {
    const copyExpressionArr = [...origin];
    for (let i = 0; i < 3; i++) {
      const currentCom = com[i];
      for (let j = 0; j < copyExpressionArr.length; j++) {
        if (copyExpressionArr[j] === currentCom) {
          copyExpressionArr[j - 1] = cal(
            currentCom,
            copyExpressionArr[j - 1],
            copyExpressionArr[j + 1]
          );
          copyExpressionArr.splice(j, 2);
          j--;
        }
      }
    }
    result = Math.max(Math.abs(copyExpressionArr[0]), result);
  }
  return result;
}
