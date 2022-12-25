function solution(data, col, row_begin, row_end) {
  var answer = 0;

  data.sort((a, b) => {
    if (a[col - 1] !== b[col - 1]) {
      return a[col - 1] - b[col - 1];
    } else {
      return b[0] - a[0];
    }
  });
  for (let row = row_begin; row <= row_end; row++)
    answer ^= data[i - 1].reduce((a, c) => a + (c % i), 0);
  return answer;
}
