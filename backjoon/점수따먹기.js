let input = `3 5
2 3 -21 -22 -23
5 6 -22 -23 7
-22 -23 4 10 2`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input
    .shift()
    .split(" ")
    .map((el) => Number(el) + 1);
  const matrix = [Array.from({ length: colLen }, () => 0)];
  for (let i = 1; i < rowLen; i++) {
    matrix[i] = [0, ...input[i - 1].split(" ").map(Number)];
  }

  for (let r = 1; r < rowLen; r++) {
    for (let c = 1; c < colLen; c++) {
      matrix[r][c] += matrix[r][c - 1];
    }
  }

  for (let c = 1; c < colLen; c++) {
    for (let r = 1; r < rowLen; r++) {
      matrix[r][c] += matrix[r - 1][c];
    }
  }

  let result = -Infinity;
  for (let initRow = 1; initRow < rowLen; initRow++) {
    for (let initCol = 1; initCol < colLen; initCol++) {
      for (let endRow = initRow; endRow < rowLen; endRow++) {
        for (let endCol = initCol; endCol < colLen; endCol++) {
          result = Math.max(
            result,
            calArea(initRow, initCol, endRow, endCol, matrix)
          );
        }
      }
    }
  }
  console.log(matrix);
  console.log(result);
};

const calArea = (iR, iC, eR, eC, matrix) => {
  return (
    matrix[eR][eC] -
    matrix[iR - 1][eC] -
    matrix[eR][iC - 1] +
    matrix[iR - 1][iC - 1]
  );
};

solution();
