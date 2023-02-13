let input = `9 10 1 11 12
13 14 2 15 16
3 4 17 5 6
18 19 7 20 21
22 23 8 24 25
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25`.split("\n");

const bingo = {};
const checkBingo = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => false)
);

const canSayBingo = (board) => {
  let answer = 0;
  board.forEach((rows) => {
    if (!rows.includes(false)) answer++;
  });

  let flag;
  for (let col = 0; col < 5; col++) {
    flag = true;
    for (let row = 0; row < 5; row++) {
      if (!board[row][col]) flag = false;
    }
    if (flag) answer++;
  }

  flag = true;
  for (let i = 0; i < 5; i++) {
    if (!board[i][i]) flag = false;
  }
  if (flag) answer++;

  flag = true;
  for (let i = 0; i < 5; i++) {
    if (!board[i][4 - i]) flag = false;
  }
  if (flag) answer++;

  return answer >= 3 ? true : false;
};

for (let row = 0; row < 5; row++) {
  let rowInfo = input.shift().split(" ").map(Number);
  for (let col = 0; col < 5; col++) {
    bingo[rowInfo[col]] = [row, col];
  }
}

function solution() {
  let trials = 0;
  for (let i = 0; i < 5; i++) {
    let nums = input[i].split(" ").map(Number);
    for (let j = 0; j < 5; j++) {
      let curNum = nums[j];
      const [row, col] = bingo[curNum];
      checkBingo[row][col] = true;
      trials++;

      if (canSayBingo(checkBingo)) {
        return console.log(trials);
      }
    }
  }
}

solution();

// let b = [
//   [true, false, false, false, true],
//   [false, true, true, true, true],
//   [true, true, true, true, true],
//   [false, true, true, true, false],
//   [true, false, true, false, true],
// ];
// console.log(canSayBingo(b));
