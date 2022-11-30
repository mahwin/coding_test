function solution(n, s) {
  if (n > s) return [-1];

  //   합은 같은데 곱이 제일 큰 조합은 S 의 원소가 편차가 적어야함.
  //   ex 합이 12면 3*3*3*3 >>>>> 9 * 1 * 1 * 1
  let arr = [];

  while (s > 0) {
    let share = Math.floor(s / n);
    s -= share;
    n--;
    arr.push(share);
  }
  return arr.sort((a, b) => a - b);
}

console.log(solution(2, 9));
