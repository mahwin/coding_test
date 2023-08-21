let input = `8
1 8
9 16
3 7
8 10
10 14
5 6
6 11
11 12`.split("\n");

let [N, ...info] = input;

const obj = [];

info.forEach((el) => {
  const [s, e] = el.split(" ").map(Number);
  obj.push([s, 1]);
  obj.push([e, -1]);
});

obj.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
let answer = 0;
let room = 0;
obj.forEach((el) => {
  console.log(el);
  room += el[1];

  answer = Math.max(room, answer);
});
console.log(answer);
