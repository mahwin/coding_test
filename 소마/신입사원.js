let input = `8
11110000
11110000
00011100
00011100
11110000
11110000
11110011
11110011`.split("\n");

function sol(num, input) {
  let peopleScores = [];

  for (let i = 0; i < num; i++) {
    const [one, two] = input[i].split(" ").map(Number);
    peopleScores.push([one, two]);
  }
  peopleScores.sort((a, b) => a[0] - b[0]);

  let cnt = 1;
  let tmp = peopleScores[0][1];
  for (let i = 1; i < num; i++) {
    if (tmp > peopleScores[i][1]) {
      tmp = peopleScores[i][1];
      cnt++;
    }
  }
  return cnt;
}

const N = Number(input.shift());

for (let i = 0; i < N; i++) {
  let cases = Number(input.shift());
  console.log(sol(cases, input.splice(0, cases)));
}
