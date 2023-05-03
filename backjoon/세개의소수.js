// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `3
7
11
25`
  .split("\n")
  .map(Number);

let prime = []; //에라토스테네스의 체로 구한 소수 배열
let len; // prime의 길이 저장

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const che = (last) => {
  const primeCheck = Array.from({ length: last }, () => false);

  for (let i = 2; i < last; i++) {
    if (primeCheck[i]) continue;
    prime.push(i);
    for (let j = i; j < last; j += i) {
      primeCheck[j] = true;
    }
  }
};

const find = (target) => {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      for (let k = 0; j < len; k++) {
        const sum = prime[i] + prime[j] + prime[k];
        if (target === sum) {
          console.log(prime[i], prime[j], prime[k]);
          return;
        } else if (target < sum) {
          break;
        }
      }
    }
  }
};

const solution = () => {
  const n = input.shift();
  let max = Math.max(...input);
  che(max);

  len = prime.length;
  for (let i = 0; i < n; i++) {
    find(input[i]);
  }
};

solution();

//시간 220ms
//메모리 11MB
