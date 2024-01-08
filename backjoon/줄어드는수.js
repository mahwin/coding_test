const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = "1024";

const solution = () => {
  const N = +input;
  const MAX = 9876543210;
  const bfs = () => {
    const q = [];
    let cnt = 0;
    for (let i = 1; i <= 10; i++) {
      q.push(i.toString());
      if (i === N) return i - 1;
      cnt++;
    }

    while (q.length) {
      const acc = q.shift();
      const tail = acc[acc.length - 1];
      for (let i = 0; i < Number(tail); i++) {
        const nextAcc = acc + i;
        cnt++;
        if (cnt === N) return nextAcc;

        if (Number(nextAcc) >= MAX) return -1;
        q.push(nextAcc);
      }
    }
  };
  return bfs();
};

console.log(solution());
