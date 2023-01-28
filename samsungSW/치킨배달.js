let input = `5 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1`.split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const colLength = input[0].split(" ").length;

const housePos = [];
const chickenPos = [];

for (let i = 0; i < N; i++) {
  let curRow = input[i].split(" ").map(Number);
  for (let j = 0; j < colLength; j++) {
    let cur = curRow[j];

    if (!cur) continue;
    if (cur === 1) housePos.push([i, j]);
    else chickenPos.push([i, j]);
  }
}

const findChicken = (house, chicken) => {
  let min = Infinity;
  let [hr, hc] = house;
  for (chi of chicken) {
    min = Math.min(Math.abs(chi[0] - hr) + Math.abs(chi[1] - hc), min);
  }
  return min;
};

const getCombination = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];
  arr.forEach((fixed, index) => {
    const tmp = getCombination(arr.slice(index + 1), pick - 1);
    tmp.forEach((el) => result.push([fixed, ...el]));
  });
  return result;
};

let arr = Array.from({ length: chickenPos.length }, (_, i) => i);

const combis = getCombination(arr, M);
let min = Infinity;

for (const com of combis) {
  let tmp = 0;
  for (const pos of housePos) {
    let chicken = com.map((el) => chickenPos[el]);
    tmp += findChicken(pos, chicken);
  }

  min = Math.min(tmp, min);
}

console.log(min);
