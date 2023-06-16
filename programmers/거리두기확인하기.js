const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 5 || c >= 5) return false;
  return true;
};
const findPeople = (place, r, c, v) => {
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  const queue = [[r, c, 0]];

  while (queue.length) {
    const [row, col, cnt] = queue.shift();

    if (cnt > 0 && place[row][col] === "P") return true;
    if (cnt < 2) {
      for (const d of dirs) {
        const nr = row + d[0];
        const nc = col + d[1];
        if (isValid(nr, nc) && !v[nr][nc] && place[nr][nc] !== "X") {
          queue.push([nr, nc, cnt + 1]);
        }
      }
    }
  }
  return false;
};
const check = (place) => {
  const v = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => false)
  );
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (place[r][c] === "P") {
        v[r][c] = true;
        if (findPeople(place, r, c, v)) {
          return 0;
        }
      }
    }
  }
  return 1;
};

function solution(places) {
  let result = [];
  places.forEach((place) => {
    result.push(check(place));
  });
  return result;
}
