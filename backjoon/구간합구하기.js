let input = `1 2 1
1
1 1 2
1 1 3
2 1 1`.split("\n");

const [n, m, k] = input[0].split(" ").map(Number);

let arr = Array.from({ length: n + 1 }, () => BigInt(0));
let tree = Array.from({ length: n + 1 }, () => BigInt(0));

function sum(i) {
  let result = BigInt(0);
  while (i > 0) {
    result += tree[i];
    i -= i & -i;
  }
  return result;
}

function update(i, diff) {
  while (i <= n) {
    tree[i] += diff;
    i += i & -i;
  }
}

for (let i = 1; i <= n; i++) {
  num = BigInt(input[i]);
  arr[i] = num;
  update(i, num);
}

let result = [];
for (let i = n + 1; i <= n + m + k; i++) {
  let [a, b, c] = input[i].split(" ");
  if (a === "1") {
    b = Number(b);
    update(b, BigInt(c) - arr[b]);
    arr[b] = BigInt(c);
  } else {
    let val = sum(Number(c)) - sum(Number(b) - 1);
    result.push(Number(val));
  }
}

console.log(result.join("\n"));
