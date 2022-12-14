const transfer = (n, k) => {
  if (k === 10) return "" + n;
  let divs = [];
  while (n) {
    remainder = n % k;
    divs.push(remainder);
    n = Math.floor(n / k);
  }
  return divs.reverse().join("");
};

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 3; i <= Math.ceil(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function solution(n, k) {
  let answer = 0;
  let transferNum = transfer(n, k);

  transferNum
    .split("0")
    .forEach((numStr) => (isPrime(+numStr) ? answer++ : null));

  return answer;
}

solution(110011, 10);
