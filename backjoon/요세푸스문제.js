const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

const solution = () => {
  let result = [];
  input = input.split(" ").map(Number);
  let jump = input[1];
  let index = 0;
  let arrayL;
  while (true) {
    index += jump;
    arrayL = array.length;
    if (arrayL === 0) break;
    while (arrayL < index) {
      index = index - arrayL;
    }
    result.push(array[index - 1]);
    array = [...array.slice(0, index - 1), ...array.slice(index, arrayL)];
    index--;
  }
  let finResult = "<" + result.join(", ") + ">";
  console.log(finResult);
};

solution();
