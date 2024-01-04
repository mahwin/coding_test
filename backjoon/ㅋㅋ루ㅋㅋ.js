// KRKKRKRRRKKKRKK 11

// KKKRKRRKRKRKRKRKK 12

// KKKKKKKKKKRKK 5

// KKRKRKKKKKKK 7

// KKKRRKRKRK 8

// KKKKKKKRKRKK 7
//41 15
let input = `KKRKK`;

const countR = (input) => {
  let cnt = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "R") cnt++;
  }
  return cnt;
};

const solution = () => {
  let n = input.length;
  let remainR = countR(input);
  let result = 0;
  let [left, right] = [0, n - 1];
  let [leftK, rightK] = [0, 0];
  while (left <= right) {
    if (remainR === 0) break;
    result = Math.max(result, remainR + Math.min(leftK, rightK) * 2);
    if (leftK < rightK) {
      if (input[left] === "R") {
        remainR--;
      } else {
        leftK += 1;
      }
      left++;
    } else {
      if (input[right] === "R") {
        remainR--;
      } else {
        rightK += 1;
      }
      right--;
    }
  }

  console.log(result);
};

solution();
