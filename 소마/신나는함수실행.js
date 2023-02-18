let input = `1 1 1
2 2 2
6 0 2
10 4 6
50 50 50
-1 7 18
-1 -1 -1`.split("\n");
const dic = {};
function sol(a, b, c) {
  let key = [a, b, c].join(",");
  if (dic[key]) return dic[key];
  if (a <= 0 || b <= 0 || c <= 0) {
    dic[key] = 1;
    return 1;
  }
  if (a > 20 || b > 20 || c > 20) return sol(20, 20, 20);
  if (a < b && b < c) {
    dic[key] = sol(a, b, c - 1) + sol(a, b - 1, c - 1) - sol(a, b - 1, c);
    return dic[key];
  }
  dic[key] =
    sol(a - 1, b, c) +
    sol(a - 1, b - 1, c) +
    sol(a - 1, b, c - 1) -
    sol(a - 1, b - 1, c - 1);
  return dic[key];
}

let index = 0;
while (input[index] !== "-1 -1 -1") {
  const [a, b, c] = input[index].split(" ").map(Number);
  // w(1, 1, 1) = 2 형식
  const result = sol(a, b, c);
  console.log(`w(${a}, ${b}, ${c}) = ${result}`);
  index++;
}
