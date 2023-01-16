function solution(s) {
  let charObj = new Map();
  let answer = [];
  for (let index = 0; index < s.length; index++) {
    const char = s[index];
    if (!charObj.has(char)) {
      answer.push(-1);
      charObj.set(char, index);
    } else {
      answer.push(index - charObj.get(char));
      charObj.set(char, index);
    }
  }
  return answer;
}
