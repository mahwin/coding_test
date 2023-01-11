function solution(command) {
  //0 북 1 동 2 남 3 서
  let pos = [0, 0];
  let dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let direction = 0;
  for (let com of command.split("")) {
    if (com === "G") {
      const [addX, addY] = dirs[direction];
      pos = [pos[0] + addX, pos[1] + addY];
    } else if (com === "R") {
      direction = direction + 1 > 3 ? 0 : direction + 1;
    } else if (com === "L") {
      direction = direction - 1 < 0 ? 3 : direction - 1;
    } else {
      const [addX, addY] = dirs[direction];
      pos = [pos[0] - 1 * addX, pos[1] - 1 * addY];
    }
  }
  return pos;
}
