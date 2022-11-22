function solution(n, info) {
  let answer = [];
  let score = 0;
  const dfs = (idx, remainArrow, ryonBoard) => {
    //쏠 화살이 없으면 재귀 종료
    if (remainArrow < 0) return;
    //화살 다 쐈으면 점수 비교
    if (remainArrow === 0) {
      let ryon = 0;
      let apeach = 0;

      for (let i = 0; i < 11; i++) {
        //둘 다 못 맞췄으면 패스
        if (info[i] === 0 && ryonBoard[i] === 0) {
          continue;
        }

        const eachOtherDiff = info[i] - ryonBoard[i];

        if (eachOtherDiff >= 0) {
          apeach += 10 - i;
        } else if (eachOtherDiff < 0) {
          ryon += 10 - i;
        }
      }

      const sumDiff = ryon - apeach;
      //  점수 차가 같을 경우 낮은 점수를 많이 쏜 경우를 택함.
      if (score === sumDiff) {
        // idx가 0이 10점이라 reverse
        const preReverse = [...answer].reverse().join("");
        const curReverse = [...ryonBoard].reverse().join("");

        if (preReverse < curReverse) {
          answer = [...ryonBoard];
        }
      } else if (score < diff) {
        answer = [...ryonBoard];
        score = diff;
      }
      return;
    }

    for (let i = idx; i < 11; i++) {
      const origin = ryonBoard[i];

      for (let j = info[i] + 1; j >= 0; j--) {
        board[i] = j;
        dfs(i + 1, remainArrow - j, ryonBoard);
      }
      ryonBoard[i] = origin;
    }
  };
  for (let i = 0; i < 11; i++) {
    const board = Array(11).fill(0);

    board[i] = info[i] + 1;
    dfs(i + 1, n - board[i], board);
  }
  return score === 0 ? [-1] : answer;
}
