function solution(triangle) {
  const len = triangle.length;

  for (let i = 1; i < len; i++) {
    triangle[i][0] += triangle[i - 1][0];
    triangle[i][i] += triangle[i - 1][i - 1];

    for (let j = 1; j < i; j++) {
      triangle[i][j] += Math.max(triangle[i - 1][j - 1], triangle[i - 1][j]);
    }
  }

  return Math.max(...triangle.at(-1));
}
