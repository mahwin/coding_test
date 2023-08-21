let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const keyObj = {};
const hands = {};
let distance = 0;

const solution = () => {
  const keyboards = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const onlyLeft = new Set("qwertasdfgzxcv");
  const onlyRight = new Set("yuiophjklbnm");
  for (let row = 0; row < keyboards.length; row++) {
    const keyboard = keyboards[row];
    for (let col = 0; col < keyboard.length; col++) {
      const key = keyboard[col];
      keyObj[key] = [row, col];
    }
  }

  distance += input[1].length;

  const [leftKey, rightKey] = input[0].split(" ");

  hands["left"] = keyObj[leftKey];
  hands["right"] = keyObj[rightKey];

  for (let i = 0; i < input[1].length; i++) {
    const key = input[1][i];
    getDistance(key, onlyLeft, onlyRight);
  }
  console.log(distance);
};

const getDistance = (key, onlyLeft) => {
  const [r, c] = keyObj[key];
  const [lr, lc] = hands.left;
  const [rr, rc] = hands.right;
  if (onlyLeft.has(key)) {
    hands.left = [r, c];
    distance += Math.abs(r - lr) + Math.abs(c - lc);
  } else {
    hands.right = [r, c];
    distance += Math.abs(r - rr) + Math.abs(c - rc);
  }
};

solution();
