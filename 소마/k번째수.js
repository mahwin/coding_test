let input = `3
7`.split("\n");
const [N, target] = input.map(Number);

const counter = (mid) => {
  let cnt = 0;

  for (let i = 1; i <= N; i++) {
    cnt += Math.min(N, Math.floor(mid / i));
  }

  return cnt;
};

let [left, right] = [0, N ** 2];
let answer;
while (left <= right) {
  let mid = ((left + right) / 2) >> 0;
  if (counter(mid) >= target) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(left);
