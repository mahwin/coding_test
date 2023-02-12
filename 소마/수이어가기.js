let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();

// let input = '1'
input = Number(input);

let max = 2;

let answer = [];
for (let i = 1; i <= input; i++) {
  let numArr = [input, i];
  while (numArr[numArr.length - 2] - numArr[numArr.length - 1] >= 0) {
    numArr.push(numArr[numArr.length - 2] - numArr[numArr.length - 1]);
  }
  if (max < numArr.length) {
    max = numArr.length;
    answer = [...numArr];
  }
}
console.log(max);
console.log(answer.join(" "));
