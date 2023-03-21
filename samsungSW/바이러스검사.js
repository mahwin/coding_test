const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const n = Number(input[0]);
  const people = input[1].split(" ").map(Number);
  const [a, b] = input[2].split(" ").map(Number);
  let result = 0;
  people.forEach((p) => {
    if (a >= p) result += 1;
    else {
      result += 1 + Math.ceil((p - a) / b);
    }
  });
  console.log(result);
  process.exit();
});
