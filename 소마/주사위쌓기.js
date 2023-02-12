let input = `5
2 3 1 6 5 4
3 1 2 4 6 5
5 6 4 1 3 2
1 3 6 2 4 5
4 1 6 5 2 3`.split("\n");

const N = Number(input.shift());

let pair = { 0: 5, 5: 0, 1: 3, 3: 1, 2: 4, 4: 2 };

const findBest2 = (nums) => {
  let max = -Infinity;

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (row === col) continue;
      if (imPossible[row] !== col) {
        max = Math.max(nums[row] + nums[col], max);
      }
    }
  }
  return max;
};

const findSideMax = (nums, bottom, top) => {
  let max = 0;
  for (let i = 0; i < 6; i++) {
    if (i === bottom || i === top) continue;
    max = Math.max(nums[i], max);
  }
  return max;
};

let answer = 0;
let dice = input[0].split(" ").map(Number);

for (let i = 0; i < 6; i++) {
  let sum = 0;
  let bottomIdx = i;
  let topIdx = pair[i];
  let topVal = dice[topIdx];
  sum += findSideMax(dice, bottomIdx, topIdx);
  for (let j = 1; j < N; j++) {
    let dice = input[j].split(" ").map(Number);

    bottomIdx = dice.indexOf(topVal);
    topIdx = pair[bottomIdx];
    topVal = dice[topIdx];
    sum += findSideMax(dice, bottomIdx, topIdx);
  }
  answer = Math.max(answer, sum);
}

console.log(answer);
