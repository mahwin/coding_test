function solution(number, limit, power) {
  let answer = 0;

  const divisor = (num) => {
    let divisors = 2;
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      num % i === 0 ? (divisors += 2) : null;
    }
    if (Number.isInteger(Math.sqrt(num))) divisors--;

    return divisors;
  };

  for (let num = 1; num <= number; num++) {
    const divisors = divisor(num);
    divisors > limit ? (answer += power) : (answer += divisors);
  }
  return answer;
}
//
