let input = `5 20
4 42 40 26 46`.split("\n");

const [n, target] = input[0].split(" ").map(Number);
const trees = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const bs = (num) => {
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    let mid = ((left + right) / 2) >> 0;
    if (trees[mid] > num) {
      right = mid - 1;
      idx = mid;
    } else {
      left = mid + 1;
    }
  }
  return idx;
};

let left = 0;
let right = trees[n - 1];
let tmp;

while (left <= right) {
  let num = ((left + right) / 2) >> 0;
  let init = bs(num);

  let acc = 0;
  for (let i = init; i < n; i++) {
    acc += trees[i] - num;
  }
  if (acc >= target) {
    tmp = num;
    left = num + 1;
  } else right = num - 1;
}

console.log(tmp);
