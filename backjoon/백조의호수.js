let input = `1 7
LXX.XXL`.split("\n");

// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const findBird = (n, m, lake) => {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (lake[r][c] == "L") {
        lake[r][c] = ".";
        return [r, c];
      }
    }
  }
};
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (n, m, r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= m) return false;
  else return true;
};

const melt = (n, m, lake) => {
  const melts = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (lake[r][c] === "X") {
        for (const d of dirs) {
          const nr = r + d[0];
          const nc = c + d[1];

          if (isValid(n, m, nr, nc) && lake[nr][nc] !== "X") {
            melts.push([r, c]);
            break;
          }
        }
      }
    }
  }
  melts.forEach(([r, c]) => (lake[r][c] = "."));
};

const isMeet = (initPos, n, m, lake) => {
  const v = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );
  v[initPos[0]][initPos[1]] = true;
  const queue = [[...initPos]];

  while (queue.length) {
    const [r, c] = queue.shift();
    if (lake[r][c] == "L") return true;
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(n, m, nr, nc) && !v[nr][nc] && lake[nr][nc] !== "X") {
        v[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }

  return false;
};

function sol(n, m, lake) {
  lake = lake.map((el) => el.split(""));
  let bird = findBird(n, m, lake);
  let day = 1;
  const melts = melt(n, m, lake);
  while (true) {
    melt(n, m, lake);
    if (isMeet(bird, n, m, lake)) return day;
    day++;
  }
}

const [n, m] = input.shift().split(" ").map(Number);
const lake = input;
console.log(sol(n, m, lake));
