let input = `4 11
427
541
774
822`.split("\n");

let n, k;
const bs = (input) => {
  let l = 0;
  let r = Number.MAX_SAFE_INTEGER;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let people = 0;
    for (const amount of input) {
      people += Math.floor(amount / mid);
    }

    if (people >= k) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return r;
};
const solution = () => {
  [n, k] = input.shift().split(" ").map(Number);
  input = input.map(Number);
  return bs(input);
};

console.log(solution());
