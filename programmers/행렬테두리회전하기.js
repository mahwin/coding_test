function solution(rows, columns, queries) {
  let result = [];

  const board = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: columns }, (_, c) => r * columns + c + 1)
  );

  queries.forEach((el) => {
    const [sR, sC, eR, eC] = el.map((num) => num - 1);
    console.log(sR, sC, eR, eC);
    let tmp = [];
    let pos = [];
    for (let c = sC; c <= eC; c++) {
      tmp.push(board[sR][c]);
      pos.push([sR, c]);
    }
    for (let r = sR + 1; r <= eR; r++) {
      tmp.push(board[r][eC]);
      pos.push([r, eC]);
    }
    for (let c = eC - 1; c >= sC; c--) {
      tmp.push(board[eR][c]);
      pos.push([eR, c]);
    }
    for (let r = eR - 1; r >= sR; r--) {
      tmp.push(board[r][sC]);
      pos.push([r, sC]);
    }

    result.push(Math.min(...tmp));
    const last = tmp.pop();
    tmp.unshift(last);

    pos.forEach(([r, c], i) => {
      board[r][c] = tmp[i];
    });
  });
  return result;
}
