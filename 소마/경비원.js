let input = `10 5
1
3 2
4 2`.split("\n");

const [colLen, rowLen] = input.shift().split(" ").map(Number);
const N = Number(input.shift());

const infoToPos = ([dir, delta]) => {
  let target = [];
  if (dir === 1 || dir === 2) {
    target = dir === 1 ? [0, delta] : [rowLen, delta];
  } else {
    target = dir === 3 ? [delta, 0] : [delta, colLen];
  }
  return [dir, ...target];
};

const calDistance = (pos1, pos2) => {
  const [d1, r1, c1] = pos1;
  const [d2, r2, c2] = pos2;
  if (r1 === r2 && (r1 === 0 || r1 === rowLen)) return Math.abs(c1 - c2);
  if (c1 === c2 && (c1 === 0 || r1 === colLen)) return Math.abs(r1 - r2);
  //반대편의 경우
  if ((r1 === 0 && r2 === rowLen) || (r1 === rowLen && r2 === 0)) {
    return Math.min(c1 + c2, 2 * colLen - c1 - c2) + rowLen;
  }
  if ((c1 === 0 && c2 === colLen) || (c1 === colLen && c2 === 0)) {
    return Math.min(r1 + r2, 2 * rowLen - r1 - r2) + colLen;
  }
  // ㄱ자 모양
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

const pos = infoToPos(input[N].split(" ").map(Number));

let sum = 0;
for (let i = 0; i < N; i++) {
  const target = infoToPos(input[i].split(" ").map(Number));
  sum += calDistance(pos, target);
}

console.log(sum);
