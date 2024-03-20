function solution(n, k) {
  const trans = n.toString(k) + "0";
  let result = 0;
  let stack = [];
  for (let i = 0; i < trans.length; i++) {
    const cur = trans[i];
    if (cur === "0") {
      if (isP(Number(stack.join("")))) result++;
      stack = [];
      continue;
    }
    stack.push(cur);
  }

  return result;
}

function isP(num) {
  if (num <= 1 || num === NaN) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
