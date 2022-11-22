function solution(quiz) {
  let answer = [];

  quiz.forEach((q) => {
    const [expression, result] = q.split("=");
    if (eval(expression) === eval(result)) answer.push("O");
    else answer.push("X");
  });
  return answer;
}
