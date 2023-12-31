const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();
//
let input = `hello xello`;

const solution = () => {
  const [a, b] = input.split(" ");

  let result = 0;
  for (let i = 0; i < b.length; i++) {
    if (i + a.length <= b.length) {
      let tmp = 0;
      let idx = 0;
      while (idx < a.length) {
        if (a[idx] === b[i + idx]) tmp++;
        idx++;
      }
      result = Math.max(tmp, result);
    } else break;
  }
  console.log(a.length - result);
};

solution();
