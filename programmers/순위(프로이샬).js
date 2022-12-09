function solution(n, results) {
  var answer = 0;

  let matrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      return i === j ? 0 : false;
    })
  );

  results.forEach(([winner, losser]) => {
    matrix[winner - 1][losser - 1] = 1;
    matrix[losser - 1][winner - 1] = -1;
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (matrix[i][j] === 1 && matrix[k][i] === 1) {
          matrix[k][j] = 1;
        }
        if (matrix[i][j] === -1 && matrix[k][i] === -1) {
          matrix[k][j] = -1;
        }
      }
    }
  }

  const validator = (matrix) => {
    let flag = true;
    matrix.forEach((link) => (link === false ? (flag = false) : null));
    return flag;
  };
  matrix.forEach((matrix) => (validator(matrix) ? answer++ : null));
  return answer;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
);
