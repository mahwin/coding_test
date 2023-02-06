// const solution = () => {};

let input = `abcdefghijklmnopqrstuvwxyz
ak`.split("\n");

let string = input[0];
let stringLength = string.length;
let stringObj = {};
let target = input[1];

for (let idx = 0; idx < stringLength; idx++) {
  const char = string[idx];
  if (stringObj[char]) continue;
  stringObj[char] = idx + 1;
}

const cal = (target) => {
  let charLen = target.length;
  if (charLen === 1) return stringObj[target];
  else
    return (
      (cal(target.slice(0, charLen - 1)) % 900528) * stringLength +
      cal(target[charLen - 1])
    );
};

console.log(
  cal("abbbbbbbbbbbbbbbbbbbbbbassadasdsadwqdqwdsadadwqwdqwdqwdwqa") % 900528
);
