const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution();
  process.exit();
});

const solution = () => {
  const N = +input.shift();

  input = input.map((el) => el.split(" ").map(Number));
  const maxN = Math.max(...input.map((el) => el[0]));
  const colorMax = Math.max(...input.map((el) => el[1]));

  const colors = [];

  input.forEach((el) => {
    const [index, color] = el;
    colors[index] = color;
  });

  const 정방향 = Array.from({ length: maxN + 1 }, () =>
    Array.from({ length: colorMax + 1 }, () => 0)
  );

  let preIndexArr = Array.from({ length: colorMax + 1 }, () => 0);

  for (let i = 0; i <= maxN; i++) {
    const color = colors[i];
    if (color === undefined) continue;

    const preIdx = preIndexArr[color];
    if (preIdx === undefined) {
      preIndexArr[color] = i;
      continue;
    }

    정방향[preIdx][color] = i - preIdx;
    preIndexArr[color] = i;
  }

  const 역방향 = Array.from({ length: maxN + 1 }, () =>
    Array.from({ length: colorMax + 1 }, () => 0)
  );

  for (let i = maxN; i >= 0; i--) {
    const color = colors[i];
    if (color === undefined) continue;

    const preIdx = preIndexArr[color];

    if (preIdx === undefined) {
      preIndexArr[color] = i;
      continue;
    }

    역방향[preIdx][color] = Math.abs(i - preIdx);
    preIndexArr[color] = i;
  }

  let result = 0;

  for (let i = 0; i <= maxN; i++) {
    const color = colors[i];
    if (color === undefined) continue;
    const 정dis = 정방향[i][color];
    const 역dis = 역방향[i][color];
    if (정dis !== 0 && 역dis !== 0) {
      result += Math.min(정방향[i][color], 역방향[i][color]);
      continue;
    }
    result += Math.max(정방향[i][color], 역방향[i][color]);
  }

  console.log(result);
};
