let input = `10 512 512`;

const [N, R, C] = input.split(" ").map(Number);

let cnt = 0;

function sol(len, r, c) {
  if (r === 0 && c === 0) {
    cnt += 1;
    return;
  } else if (r === 1 && c === 0) {
    cnt += 3;
    return;
  } else if (c === 1 && r === 0) {
    cnt += 2;
    return;
  } else if (c === 1 && r === 1) {
    cnt += 4;
    return;
  }
  const divider = len / 2;
  console.log("divider", divider);
  if (r >= divider && c >= divider) {
    cnt += divider * divider * 3;
    console.log(cnt);
    sol(divider, r - divider, c - divider);
  } else if (c >= divider) {
    cnt += divider * divider;
    sol(divider, r, c - divider);
  } else if (r >= divider) {
    cnt += divider * divider * 2;
    sol(divider, r - divider, c);
  } else {
    sol(divider, r, c);
  }
}

sol(2 ** N, R, C);
console.log(cnt - 1);
