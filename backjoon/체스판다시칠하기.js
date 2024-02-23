let input = `9 23
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBW`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  const boardLen = 8;
  let result = Infinity;
  for (let i = 0; i < rowLen - boardLen + 1; i++) {
    for (let j = 0; j < colLen - boardLen + 1; j++) {
      let count = 0;
      for (let r = 0; r < boardLen; r++) {
        for (let c = 0; c < boardLen; c++) {
          const color = input[i + r][j + c];
          if ((r + c) % 2 === 0) {
            if (color === "B") count++;
          } else {
            if (color === "W") count++;
          }
        }
      }
      result = Math.min(count, 64 - count, result);
    }
  }
  console.log(result);
};

solution();
