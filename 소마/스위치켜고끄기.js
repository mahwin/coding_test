let input = `25
0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0
1
1 1`.split("\n");

const N = Number(input.shift());
let swc = input.shift().split(" ").map(Number);
const peopleN = Number(input.shift());
swc.unshift(0);
const change = (idx) => {
  swc[idx] = swc[idx] === 1 ? 0 : 1;
};

const isValid = (idx) => {
  if (idx < 1 || N < idx) return false;
  return true;
};

for (let i = 0; i < peopleN; i++) {
  [mOw, idx] = input[i].split(" ").map(Number);
  let idxArr = [idx];
  let copyIdx = idx;
  if (mOw === 1) {
    while (isValid(copyIdx + idx)) {
      idxArr.push(copyIdx + idx);
      copyIdx += idx;
    }
  }
  if (mOw === 2) {
    let width = 1;
    while (isValid(idx - width) && isValid(idx + width)) {
      if (swc[idx - width] !== swc[idx + width]) break;
      idxArr.push(idx - width);
      idxArr.push(idx + width);
      width++;
    }
  }
  idxArr.forEach((idx) => change(idx));
}

swc = swc.slice(1);
for (let i = 0; i < Math.ceil(N / 20); i++) {
  console.log(swc.slice(i * 20, i * 20 + 20).join(" "));
}
