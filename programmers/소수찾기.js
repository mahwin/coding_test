const isP = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function solution(numbers) {
  const len = numbers.length;
  let primeSet = new Set();

  const tmp = [];
  const v = Array.from({ length: len }, () => false);
  const dfs = () => {
    const num = Number(tmp.join(""));
    if (isP(num)) primeSet.add(num);
    if (tmp.length == len) return;

    for (let i = 0; i < len; i++) {
      if (v[i]) continue;
      v[i] = true;
      tmp.push(numbers[i]);
      dfs();
      v[i] = false;
      tmp.pop();
    }
  };
  dfs();

  return primeSet.size;
}
