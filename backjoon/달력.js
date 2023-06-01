let input = `1
1 365`.split("\n");

const solution = () => {
  const n = +input[0];
  const arr = Array.from({ length: 367 }, () => 0);

  for (let i = 1; i <= n; i++) {
    const [s, e] = input[i].split(" ").map(Number);
    arr[s]++;
    arr[e + 1]--;
  }

  let pre = 0;
  arr.forEach((el, i) => {
    arr[i] = pre + el;
    pre += el;
  });

  let height = 0;
  let width = 0;
  let result = 0;

  arr.forEach((el) => {
    if (el === 0) {
      result += height * width;
      height = 0;
      width = 0;
    } else {
      width++;
      height = Math.max(height, el);
    }
  });
  console.log(result);
};

solution();
