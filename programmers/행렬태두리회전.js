function solution(rows, columns, queries) {
  let answer = [];
  const board = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => i * columns + j + 1)
  );

  queries.forEach((el) => {
    const [ir, ic, er, ec] = el.map((num) => num - 1);
    answer.push(cal(ir, ic, er, ec, board));
  });
  return answer;
}

const cal = (ir, ic, er, ec, board) => {
  const copy = [];
  let row, col;
  // 오른 방향
  row = ir;
  for (let col = ic; col <= ec; col++) {
    copy.push(board[row][col]);
  }
  // 아래
  col = ec;
  for (let row = ir + 1; row <= er; row++) {
    copy.push(board[row][col]);
  }
  // 왼쪽
  row = er;
  for (let col = ec - 1; col >= ic; col--) {
    copy.push(board[row][col]);
  }
  // 위
  col = ic;
  for (let row = er - 1; row >= ir; row--) {
    copy.push(board[row][col]);
  }

  const end = copy.pop();
  copy.unshift(end);
  let copyP = 0;
  const min = Math.min(...copy);

  // 오른 방향
  row = ir;
  for (let col = ic; col <= ec; col++) {
    board[row][col] = copy[copyP];
    copyP++;
  }
  // 아래
  col = ec;
  for (let row = ir + 1; row <= er; row++) {
    board[row][col] = copy[copyP];
    copyP++;
  }
  // 왼쪽
  row = er;
  for (let col = ec - 1; col >= ic; col--) {
    board[row][col] = copy[copyP];
    copyP++;
  }
  // 위
  col = ic;
  for (let row = er - 1; row >= ir; row--) {
    board[row][col] = copy[copyP];
    copyP++;
  }
  return min;
};
