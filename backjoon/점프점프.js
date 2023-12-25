let input = `10
1 2 0 1 3 2 1 5 4 2`.split("\n");

const solution = () => {
  const target = Number(input[0]);
  input = input[1].split(" ").map(Number);
  const v = Array.from({ length: target }, () => false);
  v[0] = true;
  const q = [[0, 0]];
  while (q.length) {
    const [x, cnt] = q.shift();
    if (x === target - 1) return cnt;
    for (let i = 0; i < input[x]; i++) {
      if (v[x + i + 1]) continue;
      q.push([x + i + 1, cnt + 1]);
      v[x + i + 1] = true;
    }
  }
  return -1;
};

console.log(solution());
