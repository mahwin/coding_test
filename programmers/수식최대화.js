function solution(expression) {
  let answer = -Infinity;
  const operators = ["+-*", "+*-", "*-+", "*+-", "-*+", "-+*"];

  const expressArr = [];
  let tmp = [];
  for (let char of expression) {
    if ("+-*".includes(char)) {
      expressArr.push(tmp.join(""), char);
      tmp = [];
    } else tmp.push(char);
  }
  expressArr.push(tmp.join(""));

  operators.forEach((operator) => {
    let max = calc(operator, expressArr);
    answer = max > answer ? max : answer;
  });
  return answer;
}

const calc = (operator, expressArr) => {
  let max = -Infinity;
  operator.split("").forEach((oper) => {
    while (expressArr.includes(oper)) {
      let index = expressArr.indexOf(oper);
      const value = eval(expressArr.slice(index - 1, index + 2).join(""));
      expressArr = [
        ...(expressArr.slice(0, index - 1) || []),
        value,
        ...(expressArr.slice(index + 2) || []),
      ];
    }
  });
  max = Math.max(max, Math.abs(expressArr[0]));
  return max;
};

console.log(
  solution(
    "177-661*999*99-133+221+334+555-166-144-551-166*166-166*166-133*88*55-11*4+55*888*454*12+11-66+444*99"
  )
);
