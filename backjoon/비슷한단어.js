// let input = `12
// cacccdaabc
// cdcccaddbc
// dcdddbccad
// bdbbbaddcb
// bdbcadbbdc
// abaadcbbda
// babcdabbac
// cacdbaccad
// dcddabccad
// cacccbaadb
// bbcdcbcbdd
// bcbadcbbca`.split("\n");

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// a,a => b c X     // 같은 알파벳을 하나의 알파벳으로 바꾸기 불가능 changeObj로 체크
// a,b => c c X     // 다른 알파벳을 같은 문자로 바꾸기 불가능 set으로 체크
const check = (word1, word2) => {
  const changeObj = {};
  let set = new Set();

  for (let i = 0; i < word1.length; i++) {
    //바꾼 적이 없고, 바꿀 값을 사용한 적도 없다면
    if (!changeObj[word2[i]] && !set.has(word1[i])) {
      changeObj[word2[i]] = word1[i];
      set.add(word1[i]);
    } else if (changeObj[word2[i]] === word1[i]) continue;
    else return false;
  }
  return true;
};

function solution() {
  const n = +input.shift();
  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (check(input[i], input[j])) {
        result++;
      }
    }
  }
  console.log(result);
}

solution();
