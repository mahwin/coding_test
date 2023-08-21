// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `9
RBBBRBRRR`.split("\n");
const n = input[0];
const ballCnts = { R: 0, B: 0 }; //'R','B' 수
let preInfo = []; // 'ball color', 갯수
for (let i = 0; i < n; i++) {
  const ball = input[1][i];
  if (!preInfo.length) {
    preInfo = [ball, 1];
    continue;
  }

  if (preInfo[0] === ball) {
    preInfo[1]++;
  } else {
    const [preBall, accCnt] = preInfo;
    ballCnts[preBall] += accCnt;
    preInfo = [ball, 1];
  }
}
console.log(Math.min(...Object.values(ballCnts)));
