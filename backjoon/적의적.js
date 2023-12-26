let input = `4 3
1 2
2 3
1 3`.split("\n");

const getP = (x, p) => {
  if (p[x] === x) return x;
  p[x] = getP(p[x], p);
  return p[x];
};

const union = (x1, x2, p) => {
  const p1 = getP(x1, p);
  const p2 = getP(x2, p);
  if (p1 > p2) p[x1] = p2;
  else p[x2] = p1;
};

const solution = () => {
  const enemyObj = {};
  const [PEOPLE_LEN, LEN] = input[0].split(" ").map(Number);
  for (let i = 1; i < PEOPLE_LEN + 1; i++) {
    enemyObj[i] = [];
  }

  const friend = Array.from({ length: PEOPLE_LEN + 1 }, (_, i) => i);

  for (let i = 1; i <= LEN; i++) {
    const [x1, x2] = input[i].split(" ").map(Number);

    const p1 = getP(x1, friend);
    const p2 = getP(x2, friend);

    if (p1 === p2) return 0;
    else {
      const enemy1 = enemyObj[x1];
      const enemy2 = enemyObj[x2];
      if (enemy1.length != 0) {
        union(x2, enemy1[0], friend);
      }
      if (!enemy1.includes(x2)) enemy1.push(x2);

      if (enemy2.length != 0) {
        union(x1, enemy2[0], friend);
      }
      if (!enemy2.includes(x1)) enemy2.push(x1);
    }
  }
  return 1;
};

console.log(solution());
