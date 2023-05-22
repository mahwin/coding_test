// 'yeaaonmmuunaeem' => 'yeoam'
// 'helloolleh' => -1
// 'aaaaa' =>'a'

const solution = (input) => {
  const n = input.length;
  let stack = [];

  for (let i = 0; i < n; i++) {
    const char = input[i];
    if (!stack.length) {
      stack.push(char);
      continue;
    }
    if (stack.at(-1) === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0 ? -1 : stack.join("");
};

const inputs = ["yeaaonmmuunaeem", "helloolleh", "aaaaa"];
const answers = ["yeoam", -1, "a"];

for (let i = 0; i < 3; i++) {
  const myAnswers = solution(inputs[i]);
  console.log("내 답 :", myAnswers);
  console.log("정답 :", answers[i]);
  console.log(myAnswers === answers[i] ? "O" : "X");
}
