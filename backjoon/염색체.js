const fs = require("fs");
const inputs = fs.readFileSync("./dev/stdin").toString().split("\n");

const solution = () => {
  const result = [];
  const N = Number(inputs[0]);
  const regex = /^[A-F]?A+F+C+[A-F]?$/;
  for (let i = 1; i <= N; i++) {
    const line = inputs[i];
    line.match(regex) ? result.push("Infected!") : result.push("Good");
  }
  console.log(result.join("\n"));
};

solution();
