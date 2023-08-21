let input = `7
abba
summuus
xabba
xabbay
comcom
comwwmoc
comwwtmoc`.split("\n");

// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const isPalindrome = (string) => {
  let [l, r] = [0, string.length - 1];
  while (l < r) {
    if (string[l] === string[r]) {
      [l, r] = [l + 1, r - 1];
    } else {
      //왼쪽 제거
      if (l + 1 < r) {
        const newString = string.slice(0, l) + string.slice(l + 1);
        if (newString === newString.split("").reverse().join("")) return 1;
      }
      //오른쪽 제거
      if (l < r - 1) {
        const newString = string.slice(0, r) + string.slice(r + 1);
        if (newString === newString.split("").reverse().join("")) return 1;
      }
      return 2;
    }
  }
  return 0;
};

const solution = () => {
  const n = Number(input.shift());
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(isPalindrome(input[i]));
  }
  console.log(result.join("\n"));
};

solution();
