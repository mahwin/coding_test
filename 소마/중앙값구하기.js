let input = `3
9
1 2 3 4 5 6 7 8 9
9
9 8 7 6 5 4 3 2 1
23
23 41 13 22 -3 24 -31 -11 -8 -7
3 5 103 211 -311 -45 -67 -73 -81 -99
-33 24 56`.split("\n");

let trials = Number(input.shift());

while (trials--) {
  const N = Number(input.shift());
  let nums = [];
  for (let i = 0; i < Math.ceil(N / 10); i++) {
    nums.push(...input.shift().split(" ").map(Number));
  }
  let median = nums[0];
  let mediansArr = [median];
  let bigger = [];
  let smaller = [];
  for (let i = 0; i < (N - 1) / 2; i++) {
    let num = nums[1 + i * 2];
    let nextNum = nums[i * 2 + 2];

    median > num ? smaller.push(num) : bigger.push(num);
    median > nextNum ? smaller.push(nextNum) : bigger.push(nextNum);

    if (smaller.length === bigger.length) mediansArr.push(median);
    else if (smaller.length > bigger.length) {
      bigger.push(median);
      smaller.sort((a, b) => a - b);
      median = smaller.pop();
      mediansArr.push(median);
    } else {
      smaller.push(median);
      bigger.sort((a, b) => b - a);
      median = bigger.pop();
      mediansArr.push(median);
    }
  }
  console.log(mediansArr);
}
