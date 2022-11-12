function solution(food) {
  let answer = "";
  for (let i = 1; i < food.length; i++) {
    let forOne = Math.floor(food[i] / 2);
    if (forOne > 0) {
      answer += i.toString().repeat(forOne);
      console.log(answer);
    }
  }
  answer = answer + "0" + answer.split("").reverse().join("");
  return answer;
}
console.log(solution([1, 7, 1, 2]));
