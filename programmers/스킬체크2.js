function solution(X, Y) {
  let answer = [];

  let counterX = Array.from({ length: 10 }, () => 0);

  X.split("").forEach((num) => {
    counterX[+num]++;
  });

  Y.split("").forEach((num) => {
    if (counterX[num] > 0) {
      counterX[num]--;
      answer.push(num);
    }
  });

  if (answer.length === 0) return "-1";
  let result = answer.sort((a, b) => b - a).join("");
  if (result[0] === "0") return "0";
  return result;
}

console.log(solution("1231", "12312313123123"));
