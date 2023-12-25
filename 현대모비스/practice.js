let input = `3
50 1 0
1000 20 500
50 800
4
33000 72200 41800 1000`.split("\n");

const solution = () => {
  const k = Number(input.shift());
  Infinity;
  const 범위 = [];
  for (let i = 0; i < k; i++) {
    if (i === k - 1) {
      범위.push(Infinity, input[i].split(" ").map(Number));
    } else {
      범위.push(input[i].split(" ").map(Number));
    }
  }
  console.log(범위, "??");
};
solution();
