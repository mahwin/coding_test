let input = `7
2 4
11 4
15 8
4 6
5 3
8 10
13 6`.split("\n");

const N = Number(input.shift());

let infos = [];
let preHeight = 0;
for (let i = 0; i < N; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  infos.push([x, y]);
}
infos.sort((a, b) => a[0] - b[0]);
const initX = infos[0][0];
const lastX = infos[N - 1][0];
const pillars = Array.from({ length: lastX + 1 }, () => 0);

let pointer = 0;
for (let x = 0; x <= lastX; x++) {
  if (infos[pointer][0] === x) {
    pillars[x] = infos[pointer][1];
    pointer++;
  } else {
    pillars[x] = 0;
  }
}

let [left, right] = [initX, lastX];
let leftM = pillars[left];
let rightM = pillars[right];
let water = 0;

while (left < right) {
  leftM = Math.max(pillars[left], leftM);
  rightM = Math.max(pillars[right], rightM);

  if (leftM <= rightM) {
    water += leftM - pillars[left];
    left++;
  } else {
    water += rightM - pillars[right];
    right--;
  }
}

console.log(water + pillars.reduce((pre, acc) => (pre += acc), 0));
