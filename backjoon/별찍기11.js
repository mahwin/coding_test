const fs = require("fs");
let input = Number(fs.readFileSync("/dev/stdin").toString().trim());

const draw = (x, y, height) => {
  if (height === 3) {
    star[x][y] = "*";
    star[x + 1][y - 1] = "*";
    star[x + 1][y + 1] = "*";
    for (let i = -2; i <= 2; i++) {
      star[x + 2][y + i] = "*";
    }
  } else {
    const half = height / 2;
    draw(x, y, half);
    draw(x + half, y - half, half);
    draw(x + half, y + half, half);
  }
};

const solution = () => {
  const n = Number(input);
  star = Array.from(Array(n), () => Array(n * 2).fill(" "));
  draw(0, n - 1, n);
  console.log(star.map((el) => el.join("")).join("\n"));
};

solution();
