const find110 = (string) => {
  const idxArr = [];
  for (let i = 0; i < string.length; i++) {
    if ("110" === string.slice(i, i + 3)) {
      idxArr.push(i);
    }
  }
  return idxArr;
};

function solution(s) {
  let answer = [];
  for (let i = 0; i < s.length; i++) {
    const string = s[i];
    const idxArr = find110(string);
    let max = string;
    for (const start of idxArr) {
      let delete110 = string.slice(0, start) + string.slice(start + 3);
      let curMax =
        "110" + delete110 > delete110 + "110"
          ? "110" + delete110
          : delete110 + "110";
      max = Math.max(curMax, max);
    }
    answer.push(max);
  }

  return answer.map(String);
}

console.log(solution(["1110", "100111100", "0111111010"]));
