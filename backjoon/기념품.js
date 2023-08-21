let input = "3";

const N = Number(input);

const people = Array.from({ length: N }, (_, i) => i + 1);

const findIdx = (len, num) => {
  if (len > num) return num;
  else {
    return num % len;
  }
};
let t = 1;
let bj = 0;
while (people.length >= 2) {
  const idx = findIdx(people.length, t ** 3 + bj - 1);
  bj = idx;
  people.splice(idx, 1);
  t += 1;
}

console.log(people[0]);
