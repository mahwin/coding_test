let input = `2 2 3 3 3 3 4 4   
2 2 3 3 1 1 2 2
2 2 3 3 3 1 4 2
2 2 3 3 1 3 2 4
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
  let [r1, c1, r2, c2] = info.slice(0, 4);
  let [r3, c3, r4, c4] = info.slice(4);

  let arr = [];
  for (let row = r1; row <= r2; row++) {
    if (row >= r3 && row <= r4) {
      for (let col = c1; col <= c2; col++) {
        if (col >= c3 && col <= c4) {
          arr.push([row, col]);
        }
      }
    }
  }
  if (arr.length === 0) console.log("d");
  else if (arr.length === 1) console.log("c");
  else if (checkBox(arr)) console.log("a");
  else console.log("b");
}
