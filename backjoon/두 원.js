const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `20.0 30.0 15.0 40.0 30.0 30.0`;

const solution = () => {
  const [x1, y1, r1, x2, y2, r2] = input.split(" ").map(Number);
  let result;
  if ((x1 - x2) ** 2 + (y1 - y2) ** 2 >= (r1 + r2) ** 2) {
    console.log("0.000");
    return;
  }
  const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  if (d + Math.min(r1, r2) <= Math.max(r1, r2)) {
    let r = Math.max(r1, r2);
    result = Math.pi * r * r;
  } else {
    let theta1 = 2 * Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
    let theta2 = 2 * Math.acos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d));
    result =
      (r1 * r1 * (theta1 - Math.sin(theta1))) / 2 +
      (r2 * r2 * (theta2 - Math.sin(theta2))) / 2;
  }
  console.log(result.toFixed(3));
};

solution();
