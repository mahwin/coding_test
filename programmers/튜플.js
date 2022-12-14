function solution(s) {
  let answer = [];
  s = s.slice(1, s.length - 1);
  let sObj = {};
  let tmp = "";
  for (let char of s) {
    if (char === "{") {
      tmp = "";
    } else if (char === "}") {
      let arr = tmp.split(",");
      arr.length !== 0 ? (sObj[arr.length] = arr.map(Number)) : null;
    } else {
      tmp += char;
    }
  }
  Object.values(sObj).forEach((arr) => {
    arr.forEach((n) => {
      !answer.includes(n) ? answer.push(n) : null;
    });
  });
  return answer;
}

function solution(s) {
  return s
    .slice(2, -2)
    .split("},{")
    .map((str) => str.split(",").map(Number))
    .sort((a, b) => a.length - b.length)
    .reduce((acc, cur) => [...acc, ...cur.filter((n) => !acc.includes(n))], []);
}
