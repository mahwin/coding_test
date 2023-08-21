const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  const n = +input[0];
  const m = +input[1];
  const p = Array.from({ length: n + 1 }, (_, i) => i);
  let cost = 0;

  input = input
    .slice(2)
    .map((el) => el.split(" ").map(Number))
    .sort((a, b) => a[2] - b[2]);

  const getP = (x) => {
    if (p[x] === x) return x;
    return (p[x] = getP(p[x]));
  };

  const union = (x1, x2, c) => {
    const p1 = getP(x1);
    const p2 = getP(x2);

    //사이클이 생기면 비용 합산 x
    if (p1 === p2) return;

    p1 > p2 ? (p[p1] = p2) : (p[p2] = p1);
    cost += c;
  };

  for (let i = 0; i < m; i++) {
    const [x1, x2, c] = input[i];
    union(x1, x2, c);
  }

  console.log(cost);
  process.exit();
});
