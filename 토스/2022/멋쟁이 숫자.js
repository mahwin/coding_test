const solution = (str) => {
  let result = [];
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (tmp.length > 0 && tmp[0] == str[i]) {
      tmp += str[i];
      if (tmp.length == 3) {
        result.push(Number(tmp));
        tmp = "";
      }
    } else tmp = str[i];
  }
  return result.length === 0 ? -1 : result.sort((a, b) => b - a)[0];
};

console.log(solution("12223"));
console.log(solution("111999333"));
console.log(solution("123"));
