const numObj = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// 문자열이 숫자인지 아닌지 판별 Number.isNaN(Number(string))에다가 ' '도 아니어야함. !!!
function solution(s) {
  let result = "";
  let tmp = "";

  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    if (!Number.isNaN(Number(cur)) && cur !== " ") result += cur;
    else {
      tmp += cur;
      if (numObj[tmp] !== undefined) {
        result += numObj[tmp];
        tmp = "";
      }
    }
  }

  return Number(tmp.length > 0 ? result + numObj[tmp] : result);
}
