let input = `10 4 2 10`;
function solution() {
  const [L, W, H, N] = input.split(" ").map(Number);
  function binarySearch() {
    let ret = 0;
    let left = 0;
    let right = Math.max(L, Math.max(W, H));
    for (let i = 0; i < 57; i++) {
      let mid = (left + right) / 2;
      if (check(mid)) {
        left = mid;
        ret = mid;
      } else {
        right = mid;
      }
    }
    return ret.toFixed(9);
  }
  function check(a) {
    if (Math.floor(L / a) * Math.floor(W / a) * Math.floor(H / a) >= N)
      return true;
    return false;
  }
  let answer = binarySearch();
  return console.log(answer);
}
solution();
