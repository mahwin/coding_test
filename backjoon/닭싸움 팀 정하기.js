let input = `6
4
E 1 4
F 3 5
F 4 6
E 1 2`.split("\n");

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  const PEOPLE_LEN = +input.shift();

  const friend = Array.from({ length: PEOPLE_LEN + 1 }, (_, i) => i);
  const enemy = Array.from({ length: PEOPLE_LEN + 1 }, () => []);

  const LEN = +input.shift();

  for (let i = 0; i < LEN; i++) {
    const [type, a, b] = input[i].split(" ");
    if (type === "E") {
      enemy[a].push(b);
      enemy[b].push(a);
    } else union(a, b, friend);
  }

  for (let i = 1; i <= PEOPLE_LEN; i++) {
    if (enemy[i].length > 1) {
      for (let j = 0; j < enemy[i].length; j++) {
        for (let k = j + 1; k < enemy[i].length; k++) {
          union(enemy[i][0], enemy[i][k], friend);
        }
      }
    }
  }
  let teamSet = new Set();
  for (let i = 1; i <= PEOPLE_LEN; i++) {
    teamSet.add(getP(i, friend));
  }
  return teamSet.size;
};

const getP = (x1, p) => {
  if (p[x1] === x1) return x1;
  else p[x1] = getP(p[x1], p);
  return p[x1];
};

const union = (x1, x2, p) => {
  const px1 = getP(x1, p);
  const px2 = getP(x2, p);
  if (px1 === px2) return;
  if (px1 > px2) {
    p[x1] = px2;
  } else {
    p[x2] = px1;
  }
};

console.log(solution());
