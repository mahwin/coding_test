let input = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]];

function solution(triangle) {
  for (let i = 0; i < triangle.length - 1; i++) {
    triangle[i + 1].forEach((n, j) => {
      if (j === 0) triangle[i + 1][0] += triangle[i][0];
      else if (j === triangle[i].length)
        triangle[i + 1][j] += triangle[i][j - 1];
      else {
        triangle[i + 1][j] += Math.max(triangle[i][j - 1], triangle[i][j]);
      }
    });
  }
  return Math.max(...triangle[triangle.length - 1]);
}

console.log(solution(input));
