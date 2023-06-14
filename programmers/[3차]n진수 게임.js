function solution(n, t, m, p) {
  const result = [];
  let num = 0;
  let string = "";
  while (string.length < t * m) {
    string += num.toString(n);
    num++;
  }
  for (let i = 0; i < t; i++) {
    result.push(string[i * m + p - 1]);
  }
  return result.join("").toUpperCase();
}
