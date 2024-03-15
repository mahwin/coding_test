`
MN 크기의 행렬의 cell 값이 0이면 해당 행과 열의 모든 cell을 0으로 만들어라.
`;

const solution = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;

  let zeroRow = new Array(m).fill(false);
  let zeroCol = new Array(n).fill(false);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (zeroRow[r] || zeroCol[c]) {
        matrix[r][c] = 0;
      }
      if (matrix[r][c] === 0) {
        zeroRow[r] = true;
        zeroCol[c] = true;
        fillZero(matrix, r, c);
      }
    }
  }
};

function fillZero(matrix, r, c) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][c] = 0;
  }
  for (let i = 0; i < matrix[0].length; i++) {
    matrix[r][i] = 0;
  }
}
