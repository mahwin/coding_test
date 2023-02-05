let input = `4 4
1000
1
1
1`.split("\n");

const [N, target] = input.shift().split(" ").map(Number);
let infos = [];
for (let i = 0; i < N; i++) {
  infos.push(Number(input[i]));
}
infos = infos.sort((a, b) => a - b);

const bs = () => {
  let left = 0;
  let right = infos[infos.length - 1];
  let tmp;
  while (left <= right) {
    let mid = ((right + left) / 2) >> 0;
    let cnt = 0;
    for (const info of infos) {
      cnt += Math.floor(info / mid);
    }
    if (cnt >= target) {
      tmp = mid;
      left = mid + 1;
    } else right = mid - 1;
  }
  console.log(tmp);
};
bs();
