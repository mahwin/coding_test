let input = `18446744073709551615`;

let num = BigInt(input);
for (let i = 64; i > 0; i--) {
  let next = num / BigInt(2);
  if (next % BigInt(2) === BigInt(0)) continue;
  else {
    console.log(i);
    break;
  }
}
