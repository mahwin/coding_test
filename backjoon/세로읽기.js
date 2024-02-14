let input = `AABCDD
afzz
09121
a8EWg6
P5h3kx`.split("\n");

function solution() {
  let result = "";

  for (let j = 0; j < 15; j++) {
    for (let i = 0; i < 5; i++) {
      if (input[i].length <= j) continue;
      result += input[i][j];
    }
  }
  console.log(result);
}
solution();
