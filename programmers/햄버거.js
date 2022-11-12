function solution(ingredient) {
  var answer = 0;
  let stack;
  ingredient.map((food, idx) => {
    if (food === 1) {
      stack = 1;
    } else if (food === 2 && stack === 1) {
      stack = 2;
    } else if (food === 3 && stack === 2) {
      stack = 0;
      answer += 1;
    } else {
      stack = 0;
    }
  });
  return answer;
}
