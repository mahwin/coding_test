const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [H, W] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.trim().split(""));

let cmap = Array.from(Array(H), () => Array(W).fill(0));

for (let i = 0; i < H; i++) {
  let cloud = -1;
  for (let j = 0; j < W; j++) {
    if (map[i][j] == "c") {
      cloud = j;
    }
    cmap[i][j] = cloud == -1 ? -1 : j - cloud;
  }
}

console.log(cmap.map((v) => v.join(" ")).join("\n"));
