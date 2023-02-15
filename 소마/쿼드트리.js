// let input = `8
// 11110000
// 11110000
// 00011100
// 00011100
// 11110000
// 11110000
// 11110011
// 11110011`.split("\n");

let input = `8
11110000
11110000
00011100
00011100
11110000
11110000
11110011
11110011`.split("\n");
// let input = `2
// 11
// 11`.split("\n");

const N = Number(input.shift());

const quadTree = (board) => {
  let tmp = board[0][0];
  let divider = board.length / 2;
  let [one, two, three, four] = [[], [], [], []];

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
        return (
          "(" +
          quadTree(one) +
          quadTree(two) +
          quadTree(three) +
          quadTree(four) +
          ")"
        );
      }
    }
  }
  return tmp;
};

console.log(quadTree(input));
