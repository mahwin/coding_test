const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = `60000 101 891`;

const solution = () => {
  let [N, jimin, hansu] = input.split(" ").map(Number);

  let round = 1;
  while (true) {
    jimin = nextRound(jimin);
    hansu = nextRound(hansu);
    if (jimin === hansu) return round;
    round++;
  }
};

const nextRound = (num) => {
  return Math.floor((num + 1) / 2);
};

console.log(solution());
