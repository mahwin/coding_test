let input = `5 3
100
101
102
103
104`.split("\n");

let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');

const [houseNum, wifiNum] = input.shift().split(" ").map(Number);
let housePos = input.map(Number);
housePos.sort((a, b) => a - b);
let [left, right] = [0, housePos[housePos.length - 1]];

const canBuild = (distance) => {
  let cnt = 1;
  let nextD = housePos[0] + distance;
  for (const pos of housePos) {
    if (pos >= nextD) {
      cnt++;
      nextD = pos + distance;
    }
  }
  return cnt >= wifiNum ? true : false;
};

let answer = 0;
while (left <= right) {
  let mid = ((left + right) / 2) << 0;
  if (canBuild(mid)) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
console.log(answer);

// function count(coords, dist) {
//   let endPosition = coords[0];
//   let cnt = 1;

//   for (let i = 0; i < coords.length; i++) {
//     if (coords[i] - endPosition >= dist) {
//       cnt++;
//       endPosition = coords[i];
//     }
//   }

//   return cnt;
// }

// let left = 1;
// let right = coords[coords.length - 1];
// let answer = 0;

// while (left <= right) {
//   let mid = parseInt((left + right) / 2);
//   if (count(coords, mid) >= C) {
//     answer = mid;
//     left = mid + 1;
//   } else {
//     right = mid - 1;
//   }
// }

// console.log(answer);
