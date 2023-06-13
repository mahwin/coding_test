function solution(x) {
  const divider = x
    .toString()
    .split("")
    .reduce((p, c) => (p += Number(c)), 0);
  return x % divider === 0 ? true : false;
}
