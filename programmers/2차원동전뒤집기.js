const getCombinations = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, index) => {
    const tmp = getCombinations(arr.slice(index + 1), pick - 1);
    tmp.forEach((el) => result.push([fixed, ...el]));
  });
  return result;
};

const reverseRowOrCol = (index, rowOrCol, board) => {
  if (rowOrCol === "row") {
    for (let col = 0; col < board[0].length; col++) {
      board[index][col] = board[index][col] === 1 ? 0 : 1;
    }
  }
  if (rowOrCol === "col") {
    for (let row = 0; row < board.length; row++) {
      board[row][index] = board[row][index] === 1 ? 0 : 1;
    }
  }
};

function solution(beginning, target) {
  let answer = Infinity;
  let combis = [];
  for (let pick = 1; pick <= target.length; pick++) {
    combis.push(
      getCombinations(
        Array.from({ length: beginning[0].length }, (_, i) => i),
        pick
      )
    );
  }
  let copyBoard;
  for (const combi of combis) {
    for (const cs of combi) {
      copyBoard = beginning.map((el) => [...el]);
      for (const c of cs) {
        reverseRowOrCol(c, "col", copyBoard);
      }

      let rowChange = 0;

      for (let row = 0; row < beginning.length; row++) {
        if (
          (parseInt(copyBoard[row].join(""), 2) &
            parseInt(target[row].join(""), 2)) ===
          0
        ) {
          reverseRowOrCol(row, "row", copyBoard);
          rowChange++;
        }
      }

      let flag = true;
      for (let row = 0; row < target.length; row++) {
        if (copyBoard[row].join("") !== target[row].join("")) flag = false;
      }
      if (flag) {
        answer = Math.min(cs.length + rowChange, answer);
      }
    }
  }
  if (beginning.length === 1) {
    if (beginning[0][0] === target[0][0]) return 0;
    else return 1;
  }
  if (answer === Infinity) return -1;
  else return answer;
}

console.log(solution([[0]], [[0]]));
