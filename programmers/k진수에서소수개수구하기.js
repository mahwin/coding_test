const isPrime = (num) => {
  num = Number(num);
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function solution(n, k) {
  const string = n.toString(k).split("0");
  let result = 0;
  for (let i = 0; i < string.length; i++) {
    if (isPrime(string[i])) result++;
  }
  return result;
}
