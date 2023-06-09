function solution(arr1, arr2) {
  const rowLen = arr1.length;
  const colLen = arr2[0].length;
  const answer = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => null)
  );

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      let result = 0;
      for (let k = 0; k < arr1[r].length; k++) {
        result += arr1[r][k] * arr2[k][c];
      }
      answer[r][c] = result;
    }
  }

  return answer;
}
