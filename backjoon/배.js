let input = `4
1 2 3 4
8
1 1 2 2 3 3 4 4`.split("\n");

// 9 9 9 8 8 8 6 6 6 6 6
const n = Number(input[0]);
const wn = Number(input[2]);
let crane = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let w = input[3]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

if (w[0] > crane[0]) console.log(-1);
else {
  let answer = 0;
  while (w.length) {
    for (let i = 0; i < wn; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (crane[i] >= w[j]) {
          w.splice(j, 1);
          break;
        }
      }
    }
    answer += 1;
  }

  console.log(answer);
}
