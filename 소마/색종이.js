let input = `8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1`.split("\n");
let [N, ...board] = input;
board = board.map((el) => el.split(" ").map(Number));

let white = 0;
let blue = 0;
const cutBoard = (board) => {
  let divider = board.length / 2;
  let [one, two, three, four] = [[], [], [], []];
  let tmp = board[0][0];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (tmp !== board[i][j]) {
        board.slice(0, divider).forEach((el) => {
          one.push(el.slice(0, divider));
          two.push(el.slice(divider));
        });
        board.slice(divider).forEach((el) => {
          three.push(el.slice(0, divider));
          four.push(el.slice(divider));
        });
        cutBoard(one);
        cutBoard(two);
        cutBoard(three);
        cutBoard(four);
        return;
      }
    }
  }
  tmp === 1 ? blue++ : white++;
  return;
};

cutBoard(board);
console.log(blue);
console.log(white);
