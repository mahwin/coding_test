let input = `4
4 4 3 2 1
4 1 4 3 2
4 3 3 2 1
4 4 3 3 3
4 4 3 3 3
4 3 4 3 2
4 3 2 1 1
3 3 2 1`.split("\n");

const N = Number(input.shift());

const sol = (A, B) => {
  let Acnt = [0, 0, 0, 0, 0];
  let Bcnt = [0, 0, 0, 0, 0];
  A.forEach((el) => Acnt[el]++);
  B.forEach((el) => Bcnt[el]++);

  for (let i = 4; i > 0; i--) {
    if (Acnt[i] !== Bcnt[i]) {
      return Acnt[i] > Bcnt[i] ? console.log("A") : console.log("B");
    }
  }
  return console.log("D");
};

for (let i = 0; i < N * 2; i += 2) {
  const A = input[i].split(" ").slice(1);
  const B = input[i + 1].split(" ").slice(1);
  sol(A, B);
}

// 별,동그라미,네모,세모,무승부 4 3 2 1
