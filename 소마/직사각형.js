let input = `3 10 50 60 100 100 200 300
45 50 600 600 400 450 500 543
11 120 120 230 50 40 60 440
35 56 67 90 67 80 500 600
`.split("\n");

// let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const checkBox = (posArr) => {
  let rowSet = new Set();
  let colSet = new Set();
  posArr.forEach(([row, col]) => {
    rowSet.add(row);
    colSet.add(col);
  });
  if (rowSet.size > 1 && colSet.size > 1) return true;
};

for (let i = 0; i < 4; i++) {
  let info = input[i].split(" ").map(Number);
  solution(info);
}

function solution(info) {
  let [r1, c1, r2, c2] = info.slice(0, 4);
  let [r3, c3, r4, c4] = info.slice(4);
  let arr = [];
  if (r2 < r3 || r1 > r4 || c2 < c3 || c1 > c4) return console.log("d");
  // b,c의 경우
  else if (r1 === r4 || r2 === r3) {
    if (c1 === c4 || c2 === c3) return console.log("c");
    return console.log("b");
  } else if (c1 === c4 || c2 === c3) {
    if (r1 === r4 || r2 === r3) return console.log("c");
    return console.log("b");
  } else return console.log("a");
}
