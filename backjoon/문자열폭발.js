let input = `mirkovC4nizCC44
C4`.split("\n");

function solution(string, boom) {
  let boomLen = boom.length;

  let stack = [];
  let len = string.length;
  for (let i = 0; i < len; i++) {
    stack.push(string[i]);
    if (
      stack.length >= boom.length &&
      stack.slice(stack.length - boomLen, stack.length).join("") === boom
    ) {
      for (let i = 0; i < boomLen; i++) {
        stack.pop();
      }
    }
  }

  return stack.length ? stack.join("") : "FRULA";
}

console.log(solution(input[0], input[1]));
