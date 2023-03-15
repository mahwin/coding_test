let input = `6
7
1 6 9 3 6 7`.split("\n");

const n = Number(input[0]);
let k = Number(input[1]);
let nums = input[2].split(" ").map(Number);
nums = nums.sort((a, b) => a - b);
let D = Array.from({ length: n }, () => 0);

for (let i = 0; i < n - 1; i++) {
  D[i] = nums[i + 1] - nums[i];
}

D = D.sort((a, b) => b - a);

if (n <= k) console.log(0);
else console.log(D.slice(k - 1).reduce((a, b) => (b += a)));
