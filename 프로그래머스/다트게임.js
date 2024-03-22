function isDigit(char) {
  return /[0-9]/.test(char);
}

const scoreObj = { S: 1, D: 2, T: 3 };

function solution(dartResult) {
  let result = [0];

  let curNum = "";
  for (let i = 0; i < dartResult.length; i++) {
    const char = dartResult[i];

    if (isDigit(char)) {
      curNum += char;
      continue;
    }

    if (["D", "S", "T"].includes(char)) {
      result.push(Number(curNum) ** scoreObj[char]);
    } else if ("*" === char) {
      result[result.length - 2] += result[result.length - 2];
      result[result.length - 1] *= 2;
    } else if ("#" === char) {
      result[result.length - 1] *= -1;
    }

    curNum = "";
  }
  console.log(result);
  return result.reduce((a, c) => (a += c));
}
