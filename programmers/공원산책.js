let board = [];
let rowLen, colLen, robot;

function solution(park, routes) {
  rowLen = park.length;
  colLen = park[0].length;

  // 초기값 찾기
  for (let r = 0; r < rowLen; r++) {
    if (robot) break;
    for (let c = 0; c < colLen; c++) {
      if (park[r][c] === "S") {
        robot = [r, c];
        break;
      }
    }
  }
  routes.forEach((route) => move(park, route));

  return robot;
}

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const dirs = { N: [-1, 0], S: [1, 0], W: [0, -1], E: [0, 1] };

const move = (park, route) => {
  //N S W E
  let [d, distance] = route.split(" ");
  const dir = dirs[d];
  distance = Number(distance);
  let [pr, pc] = robot;
  for (let i = 0; i < distance; i++) {
    let nr = pr + dir[0];
    let nc = pc + dir[1];
    if (!isValid(nr, nc) || park[nr][nc] === "X") return;
    pr = nr;
    pc = nc;
  }
  robot = [pr, pc];
};

console.log(solution(["SOO", "OOO", "OOO"], ["E 2", "S 2", "W 1"]));
