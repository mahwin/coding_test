let rowLen, colLen;
const dirObj = { E: [0, 1], S: [1, 0], N: [-1, 0], W: [0, -1] };

const isValid = (r, c, nr, nc, park) => {
  if (nr < 0 || nc < 0 || nr >= rowLen || nc >= colLen) return false;
  const [minR, maxR] = [Math.min(r, nr), Math.max(r, nr)];
  const [minC, maxC] = [Math.min(c, nc), Math.max(c, nc)];

  for (let row = minR; row <= maxR; row++) {
    for (let col = minC; col <= maxC; col++) {
      if (park[row][col] === "X") return false;
    }
  }
  return true;
};

const findInit = (park) => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (park[r][c] == "S") return [r, c];
    }
  }
};

function solution(park, routes) {
  rowLen = park.length;
  colLen = park[0].length;

  let [r, c] = findInit(park);

  routes.forEach((el) => {
    const [d, len] = el.split(" ");
    const nr = r + Number(len) * dirObj[d][0];
    const nc = c + Number(len) * dirObj[d][1];

    if (isValid(r, c, nr, nc, park)) {
      [r, c] = [nr, nc];
    }
  });
  return [r, c];
}
