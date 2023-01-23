const delete110 = (string) => {
  let cnt = 0;
  if (string.length <= 2) return [string, 0];

  const stack = [string[0], string[1]];
  let len;
  for (let i = 2; i < string.length; i++) {
    stack.push(string[i]);
    len = stack.length;
    if (stack.slice(len - 3, len).join("") === "110") {
      stack.pop();
      stack.pop();
      stack.pop();
      cnt++;
    }
  }
  return [stack.join(""), cnt];
};

const findZero = (string) => {
  for (let idx = string.length - 1; idx >= 0; idx--) {
    if (string[idx] === "0") return idx + 1;
  }
  return 0;
};

function solution(s) {
  let answer = [];
  for (let i = 0; i < s.length; i++) {
    let string = s[i];
    [string, cnt] = delete110(string);

    let lastZeroIndex = findZero(string);

    let fore = string.slice(0, lastZeroIndex);
    let back = string.slice(lastZeroIndex);
    string = fore + "110".repeat(cnt) + back;
    answer.push(string);
  }
  return answer;
}

console.log(solution(["1110", "100111100", "0111111010"]));
console.log(["1101", "100110110", "0110110111"]);
