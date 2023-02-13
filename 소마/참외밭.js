let input = `1
2 10
3 30
1 100
4 100
2 90
3 70`.split("\n");

const N = Number(input.shift());
//      1 동 2 서 3 남 4 북

let rowLen = [];
let colLen = [];
let totalLen = [];
for (let i = 0; i < 6; i++) {
  [d, len] = input[i].split(" ").map(Number);
  if (d === 1 || d === 2) rowLen.push(len);
  else colLen.push(len);
  totalLen.push(len);
}
totalLen.push(totalLen[0]);

let sum = 0;
for (let i = 0; i < 6; i++) {
  sum += totalLen[i] * totalLen[i + 1];
}

const rowMax = Math.max(...rowLen);
const colMax = Math.max(...colLen);

console.log((sum - rowMax * colMax * 2) * N);
