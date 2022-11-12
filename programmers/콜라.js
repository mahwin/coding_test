function solution(a, b, n) {
  let answer = 0;
  while (n >= a) {
    const Remainder = n % a;
    n = Math.floor(n / a) * b;
    answer += n;
    n += Remainder;
  }
  return answer;
}
