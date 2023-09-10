const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `5 
2 2
3 4
5 6 
1 9
-2 -8`.split("\n");

const findMid = (arr) => {
  return arr.sort()[Math.floor(arr.length / 2)];
};

const solution = () => {
  const n = input.shift();
  const xPos = [];
  const yPos = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = input[i].split(" ");
    yPos.push(y);
    xPos.push(x);
  }
  const [midX, midY] = [findMid(xPos), findMid(yPos)];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.abs(midX - xPos[i]) + Math.abs(midY - yPos[i]);
  }
  return sum;
};

console.log(solution());
