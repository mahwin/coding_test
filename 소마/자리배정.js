let input = `7 6
87`.split("\n");

const [C, R] = input[0].split(" ").map(Number);
const target = Number(input[1]);
const board = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0)
);

let dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

let num = 1;

const isValid = (r, c) => {
  if (r < 0 || r >= R || c < 0 || c >= C) return false;
  return true;
};
const solution = () => {
  let cnt = 1;
  for (let i = 0; i < Math.ceil(R / 2); i++) {
    let [r, c] = [i, i];
    board[r][c] = cnt;
    if (cnt === target) return console.log([c + 1, r + 1].join(" "));
    cnt++;
    for (let dir of dirs) {
      while (isValid(r + dir[0], c + dir[1])) {
        if (board[r + dir[0]][c + dir[1]]) break;
        r += dir[0];
        c += dir[1];
        board[r][c] = cnt;
        if (cnt === target) return console.log([c + 1, r + 1].join(" "));
        cnt++;
      }
    }
  }
  return console.log("0");
};
solution();
