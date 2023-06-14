const cal = (num) => {
  if (num === 1) return 1;
  let cnt = 0;
  for (let i = 1; i < Math.sqrt(num); i++) {
    if (num % i === 0) cnt += 2;
  }
  return num % Math.sqrt(num) === 0 ? cnt + 1 : cnt;
};

function solution(number, limit, power) {
  let result = 0;

  for (let i = 1; i <= number; i++) {
    const cnt = cal(i);
    if (cnt > limit) {
      result += power;
    } else result += cnt;
  }
  return result;
}
