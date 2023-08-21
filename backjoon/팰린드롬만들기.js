// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

const oddFinder = (map) => {
  let odds = [];

  for (const [key, value] of map.entries()) {
    if (value % 2 !== 0) odds.push(key);
  }
  return odds;
};

const printResult = (alphaMap, len) => {
  const odds = oddFinder(alphaMap);

  const sortKeys = [...alphaMap.keys()].sort();
  let fore = "";
  sortKeys.forEach((alpha) => {
    const repeatNum = Math.floor(alphaMap.get(alpha) / 2);
    fore += alpha.repeat(repeatNum);
  });

  if (len % 2 === 0 && odds.length === 0) {
    console.log(fore + fore.split("").reverse().join(""));
  } else if (len % 2 === 1 && odds.length === 1) {
    console.log(fore + odds[0] + fore.split("").reverse().join(""));
  } else console.log("I'm Sorry Hansoo");
};

//길이가 짝수일 때와 홀수일 때 나눠서 생각
//길이가 짝수다 => 모든 알파벳 쌍이 짝수여야함.
//길이가 홀수다 => 하나의 알파벳만 홀수 여야함.
const solution = (input) => {
  const len = input.length;

  const alphaMap = new Map();
  input.split("").forEach((alpha) => {
    alphaMap.has(alpha)
      ? alphaMap.set(alpha, alphaMap.get(alpha) + 1)
      : alphaMap.set(alpha, 1);
  });

  printResult(alphaMap, len);
};

solution(input);

// 메모리 9356KB
// 시간 124ms
