let input = `2
5
3 2
1 4
4 1
2 3
5 5
7
3 6
7 3
4 2
1 4
5 7
2 5
6 1`.split("\n");

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
