let input = `2
0 0 10 10
2 2 6 6`.split("\n");
const N = Number(input[0]);

const board = Array.from({ length: 1001 }, () =>
  Array.from({ length: 1001 }, () => 0)
);

let result = [];
for (let i = N; i > 0; i--) {
  let [r1, c1, r2, c2] = input[i].split(" ").map(Number);
  let sum = 0;
  for (let row = r1; row < r2 + r1; row++) {
    for (let col = c1; col < c2 + c1; col++) {
      if (board[row][col]) continue;
      board[row][col] = i;
      sum++;
    }
  }
  result.push(sum);
}

for (let i = N - 1; i >= 0; i--) {
  console.log(result[i]);
}
