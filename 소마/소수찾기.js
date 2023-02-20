const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function solution(numbers) {
  const len = numbers.length;
  let nums = new Set();
  const visited = Array.from({ length: len }, () => false);
  const dfs = (tmp) => {
    nums.add(Number(tmp));
    for (let i = 0; i < len; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      dfs(tmp + numbers[i]);
      visited[i] = false;
    }
  };
  dfs(0, "");
  let result = 0;
  [...nums].forEach((num) => {
    if (isPrime(num)) {
      result++;
    }
  });
  return result;
}

solution("011");
