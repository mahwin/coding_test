// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `8
9223372036854775807
9223372036854775807
9223372036854775807
9223372036854775807
-9223372036854775807
-9223372036854775807
-9223372036854775807
-9223372036854775807
6
9223372036854775807
9223372036854775807
9223372036854775807
-9223372036854775807
-9223372036854775807
-9223372036854775807
8
9223372036854775807
9223372036854775807
9223372036854775807
9223372036854775807
-9223372036854775807
-9223372036854775807
-9223372036854775806
-9223372036854775807`.split("\n");

const solution = () => {
  const result = [];
  let index = 0;
  for (let i = 0; i < 3; i++) {
    const n = Number(input[index]);
    let sum = 0n;
    for (let j = index + 1; j <= index + n; j++) {
      sum += BigInt(input[j]);
    }
    index += n + 1;
    if (sum === 0n) result.push(0);
    else if (sum < 0n) result.push("-");
    else result.push("+");
  }
  console.log(result.join("\n"));
};

solution();
