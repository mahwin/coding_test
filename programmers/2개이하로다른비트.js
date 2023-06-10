const calDiff = (binary1, num) => {
  const binary2 = num.toString(2);
  let result = 0;
  binary1 = binary1.padStart(binary2.length, "0");

  for (let i = 0; i < binary1.length; i++) {
    if (binary1[i] !== binary2[i]) result++;
    if (result > 2) return false;
  }

  return result === 0 ? false : true;
};

function solution(numbers) {
  let answer = [];

  numbers.forEach((num) => {
    if (num < 2 || num % 2 === 0) answer.push(num + 1);
    else {
      const binary = num.toString(2);
      let copyNum = num + 1;
      while (true) {
        if (calDiff(binary, copyNum)) {
          answer.push(copyNum);
          break;
        }
        copyNum++;
      }
    }
  });
  return answer;
}

const findNext = (num) => {
  const binary = ["0", ...num.toString(2).split("")];

  for (let i = binary.length - 1; i >= 0; i--) {
    if (binary[i] != "1") {
      binary[i] = "1";
      binary[i + 1] = "0";

      return parseInt(binary.join(""), 2);
    }
  }
};

function solution2(numbers) {
  let answer = [];

  numbers.forEach((num) => {
    if (num < 2 || num % 2 === 0) answer.push(num + 1);
    else {
      answer.push(findNext(num));
    }
  });
  return answer;
}

console.log(solution2([2, 7]));
