let input = `5
300 400 500 400 300`.split("\n");

const solution = () => {
  const n = Number(input[0]);
  const arr = input[1].split(" ").map(Number);
  let result = arr[n - 1];
  for (let i = n - 2; i > -1; i--) {
    if (result % arr[i] == 0) continue;
    m = Math.floor(result / arr[i]) + 1;
    result = arr[i] * m;
  }
  return result;
};

console.log(solution());
