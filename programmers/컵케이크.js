function solution(topping) {
  let answer = 0;
  let toppingObj = {};
  topping.forEach((top) => {
    toppingObj[top] = toppingObj[top] ? toppingObj[top] + 1 : 1;
  });

  let toppingLen = Object.keys(toppingObj).length;

  let [one, two] = [toppingLen, 0];
  let dongsangSet = new Set();
  for (let top of topping) {
    dongsangSet.add(top);
    if (toppingObj[top] > 1) {
      toppingObj[top]--;
    } else {
      one--;
    }
    if (dongsangSet.size === one) answer++;
  }

  return answer;
}
