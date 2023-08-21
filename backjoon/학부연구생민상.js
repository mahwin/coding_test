const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 남 1 북 2 서 3 동 4
const dirs = { 1: [1, 0], 2: [-1, 0], 3: [0, -1], 4: [0, 1] };

const solution = () => {
  const findCooler = () => {
    const coolers = [];
    for (let r = 0; r < rowLen; r++) {
      for (let c = 0; c < colLen; c++) {
        if (board[r][c] == 9) coolers.push([r, c]);
      }
    }
    return coolers;
  };

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const go = (r, c, d, canSeated) => {
    while (isValid(r, c)) {
      canSeated[r][c] = true;
      const cur = board[r][c];
      switch (cur) {
        case 1:
          if ([3, 4].includes(d)) {
            d = d === 4 ? 3 : 4;
          }
          break;
        case 2:
          if ([1, 2].includes(d)) {
            d = d === 1 ? 2 : 1;
          }
          break;
        case 3:
          // d가 1이면 3
          // d가 4면  2
          // d가 3이면 1
          // d가 2면 4
          if ([1, 3].includes(d)) {
            d = d === 1 ? 3 : 1;
          } else if ([2, 4].includes(d)) {
            d = d === 4 ? 2 : 4;
          }
          break;
        case 4:
          // d가 1이면 4
          // d가 4면 1
          // d가 2면 3
          // d가 3이면 2
          if ([1, 4].includes(d)) {
            d = d === 4 ? 1 : 4;
          } else if ([2, 3].includes(d)) {
            d = d === 2 ? 3 : 2;
          }
          break;
        case 9:
          return;
      }
      [r, c] = [r + dirs[d][0], c + dirs[d][1]];
    }
  };

  const countCanSeat = () => {
    let cnt = 0;
    for (let r = 0; r < rowLen; r++) {
      for (let c = 0; c < colLen; c++) {
        if (canSeated[r][c]) cnt++;
      }
    }
    return cnt;
  };

  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  // 앉을 수 있는 곳.
  const canSeated = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  // board 채우기
  const board = [];
  for (let r = 0; r < rowLen; r++) {
    board.push(input[r].split(" ").map(Number));
  }
  // 에어컨 위치
  const coolers = findCooler(board);

  coolers.forEach(([r, c], i) => {
    canSeated[r][c] = true;
    for (let d = 1; d < 5; d++) {
      const nr = dirs[d][0] + r;
      const nc = dirs[d][1] + c;
      if (isValid(nr, nc)) go(nr, nc, d, canSeated);
    }
  });

  return countCanSeat();
};

console.log(solution(input));
