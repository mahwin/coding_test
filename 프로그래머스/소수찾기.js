function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(numbers) {
  let set = new Set();

  const v = Array.from({ length: numbers.length }, () => false);

  const dfs = (acc) => {
    if (isPrime(Number(acc))) set.add(Number(acc));

    for (let i = 0; i < numbers.length; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(acc + numbers[i]);
      v[i] = false;
    }
  };

  dfs("");
  return set.size;
}
