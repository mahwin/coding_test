let input = `4 4 36
15 43 61 21
19 33 31 55
48 63 1 30
31 28 3 8
`.split("\n");

const parser = (info) => info.split(" ").map(Number);

const plattener = (board, height, info) => {
  let [rowLen, colLen, B] = parser(info);
  let time = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      //집을 지은 곳 높이가 지금 보다 낮으면 곡갱이질 (2s/개)
      const diff = board[r][c] - height;
      if (diff > 0) {
        time += diff * 2;
        B += diff;
      } else {
        time -= diff;
        B += diff;
      }
    }
  }

  return B >= 0 ? time : Infinity;
};

const solution = () => {
  let possible = [];
  let min = Infinity;
  // input 데이터 정리
  let [rowLen, colLen, B] = parser(input[0]);
  const board = [];
  for (let i = 1; i <= rowLen; i++) {
    board.push(parser(input[i]));
  }

  for (let height = 0; height <= 256; height++) {
    const time = plattener(board, height, input[0]);
    if (min > time) {
      possible = [[time, height]];
      min = time;
    } else if (min == time) possible.push([time, height]);
  }
  return possible.sort((a, b) => b[1] - a[1])[0];
};

console.log(solution().join(" "));
