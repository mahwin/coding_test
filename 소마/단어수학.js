let input = `2
GCF
ACDEB`.split("\n");

const N = Number(input.shift());

const fair = {};
const obj = {};

for (let i = 0; i < N; i++) {
  let string = input[i];

  let jarisu = string.length - 1;
  for (let j = 0; j <= jarisu; j++) {
    const key = string[j];
    obj[key] = obj[key] ? obj[key] + 10 ** (jarisu - j) : 10 ** (jarisu - j);
  }
}

let sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
sorted.forEach((el, idx) => (fair[el[0]] = 9 - idx));

let sum = 0;
for (let i = 0; i < N; i++) {
  let string = input[i];
  let tmp = "";
  for (let j = 0; j < string.length; j++) {
    tmp += fair[string[j]];
  }
  sum += Number(tmp);
}

console.log(sum);
