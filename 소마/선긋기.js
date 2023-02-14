let input = `5
1 2
9 10
4 7
6 9
2 5
`.split("\n");

const N = Number(input.shift());
let infos = [];
for (let i = 0; i < N; i++) {
  infos.push(input[i].split(" ").map(Number));
}

infos = infos.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  } else {
    return a[0] - b[0];
  }
});
let result = [];

for (const [x1, x2] of infos) {
  let flag = false;
  for (let j = 0; j < result.length; j++) {
    const [x3, x4] = result[j];
    //겹치는 조건
    if (
      (x1 >= x3 && x1 <= x4) ||
      (x2 >= x3 && x2 <= x4) ||
      (x3 >= x1 && x3 <= x2) ||
      (x4 >= x1 && x4 <= x2)
    ) {
      result[j] = [Math.min(x3, x1), Math.max(x2, x4)];
      flag = true;
      break;
    }
  }
  if (!flag) result.push([x1, x2]);
}

console.log(result.reduce((pre, cur) => (pre += Math.abs(cur[1] - cur[0])), 0));
