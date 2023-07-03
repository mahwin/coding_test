let input = `6 3
988291`.split("\n");

const solution = () => {
  const [n, k] = input[0].split(" ").map(Number);
  let stack = [];
  let deleteCnt = 0;
  input = input[1].split("").map(Number);
  for (let i = 0; i < n; i++) {
    const cur = input[i];
    if (!stack.length) {
      stack.push(cur);
      continue;
    }
    while (stack.at(-1) < cur && deleteCnt < k) {
      deleteCnt++;
      stack.pop();
    }
    stack.push(cur);
  }
  if (stack.length > n - k) return stack.slice(0, n - k).join("");
  return stack.join("");
};

console.log(solution());
