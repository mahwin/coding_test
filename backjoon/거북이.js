const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]; // 북 동 서 남 순으로
const search = (commands) => {
  let [minX, maxX, minY, maxY] = [0, 0, 0, 0];
  let d = 0; // 거북이가 쳐다보는 방향 , 북쪽
  let pos = [0, 0]; // 거북이의 위치
  for (const command of commands.split("")) {
    if (command == "F" || command == "B") {
      let isFront = command == "F" ? 1 : -1;
      pos[0] = pos[0] + dirs[d][0] * isFront;
      pos[1] = pos[1] + dirs[d][1] * isFront;
      minY = Math.min(pos[0], minY);
      minX = Math.min(pos[1], minX);
      maxY = Math.max(pos[0], maxY);
      maxX = Math.max(pos[1], maxX);
    } else if (command === "L") {
      d = d - 1 < 0 ? 3 : d - 1;
    } else {
      d = d + 1 > 3 ? 0 : d + 1;
    }
  }
  return [minY, minX, maxY, maxX];
};

const calSquare = (posArr) => {
  const [y1, x1, y2, x2] = posArr;
  return Math.abs(x1 - x2) * Math.abs(y1 - y2);
};

const solution = (input) => {
  let result = [];
  const n = Number(input[0]);
  for (let i = 1; i <= n; i++) {
    const pos = search(input[i]);
    result.push(calSquare(pos));
  }
  console.log(result.join("\n"));
};
solution(input);
