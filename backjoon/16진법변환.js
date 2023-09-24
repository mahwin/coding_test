const obj = { 10: "a", 11: "b", 12: "c", 13: "d", 14: "e", 15: "f" };
const mapping = (arr) => {
  return arr.map((el) => {
    if (el < 10) return el;
    return obj[el];
  });
};

const hex = (numerial) => {
  let arr = [];
  while (numerial / 16 >= 1) {
    const divider = Math.floor(numerial / 16);
    const remainer = numerial - divider * 16;
    arr.push(remainer);
    numerial = divider;
  }
  //1 0 1
  arr.push(numerial);

  arr = mapping(arr);
  return arr.reverse().join("");
};

for (let i = 1; i < 1000; i++) {
  console.log(hex(i), i.toString(16));
}
