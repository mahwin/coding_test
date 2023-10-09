const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `5 2
4 1 3 5 2
4 3 1 2 5`.split("\n");

const solution = () => {
  const [n, k] = input[0].split(" ").map(Number);
  const ds = input[2].split(" ").map((el) => Number(el) - 1);
  let ss = input[1].split(" ").map(Number);
  let tmp = new Array(n).fill(0);

  for (let i = 0; i < k; i++) {
    for (let i = 0; i < n; i++) {
      tmp[ds[i]] = ss[i];
    }
    ss = [...tmp];
  }
  console.log(ss.join(" "));
};

solution();
