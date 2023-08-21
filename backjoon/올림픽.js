// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split('\n);

let input = `4 2
1 3 0 0
3 0 0 2
4 0 2 0
2 0 2 0`.split("\n");

const solution = (input) => {
  const [n, m] = input.shift().split(" ").map(Number);
  input = input.map((el) => el.split(" ").map(Number));
  let target;

  input.forEach((el) => {
    if (el[0] === m) {
      target = el.slice(1).join(",");
    }
  });

  input = input.sort((a, b) => {
    const [_a, ag, as, ac] = a;
    const [_b, bg, bs, bc] = b;
    if (ag === bg) {
      if (as === bs) {
        return bc - ac;
      } else return bs - as;
    } else return bg - ag;
  });

  for (let i = 0; i < n; i++) {
    const key = input[i].slice(1).join(",");
    if (key === target) return console.log(i + 1);
  }
};

solution(input);
