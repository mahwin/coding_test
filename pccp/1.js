function solution(input_string) {
  const stringObj = {};
  for (let i = 0; i < input_string.length; i++) {
    const char = input_string[i];
    stringObj[char] = stringObj[char] ? [...stringObj[char], i] : [i];
  }
  const answer = [];
  for (let char of Object.keys(stringObj)) {
    let indexArr = stringObj[char];

    for (let i = 0; i < indexArr.length - 1; i++) {
      if (indexArr[i + 1] - indexArr[i] > 1) {
        answer.push(char);
        break;
      }
    }
  }
  if (answer.length === 0) return "N";
  return answer.sort().join("");
}
console.log(solution("edeaaabbccd"));
