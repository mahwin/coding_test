//효율성 통과 x
// function solution(board, skill) {
//   let answer = 0;

//   for (let stage of skill) {
//     let [type, r1, c1, r2, c2, degree] = stage;
//     type === 1 ? (degree *= -1) : null;
//     for (let x = r1; x <= r2; x++) {
//       for (let y = c1; y <= c2; y++) {
//         board[x][y] += degree;
//       }
//     }
//   }
//   board.forEach((rows) =>
//     rows.forEach((el) => {
//       if (el > 0) answer++;
//     })
//   );
//   return answer;
// }

function solution(board, skill) {
  let answer = 0;

  function effect(skill, effectBoard) {
    let [type, r1, c1, r2, c2, degree] = skill;
    type === 1 ? (degree *= -1) : null;

    effectBoard[r1][c1] += degree;
    effectBoard[r2 + 1][c1] -= degree;
    effectBoard[r1][c2 + 1] -= degree;
    effectBoard[r2 + 1][c2 + 1] += degree;
  }

  const effectBoard = Array.from({ length: board.length + 1 }, (_) =>
    Array.from({ length: board[0].length + 1 }, (_) => 0)
  );

  skill.forEach((s) => effect(s, effectBoard));

  // 누적합 배열 왼쪽에서 오른쪽 방향으로 더하기
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      effectBoard[row][col + 1] += effectBoard[row][col];
    }
  }

  //누적합 배열 위에서 아래쪽 방향으로 더하기
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      effectBoard[row + 1][col] += effectBoard[row][col];
    }
  }
  // 건물 배열과 누적합 배열 비교하면서 0보다 크면 anwer ++

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      effectBoard[row][col] + board[row][col] > 0 ? answer++ : null;
    }
  }
  return answer;
}

solution(
  [
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
  ],
  [
    [1, 0, 0, 3, 4, 4],
    [1, 2, 0, 2, 3, 2],
    [2, 1, 0, 3, 1, 2],
    [1, 0, 1, 3, 3, 1],
  ]
);
