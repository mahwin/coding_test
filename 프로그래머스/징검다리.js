const getMid = (num1, num2) => Math.floor((num1 + num2) / 2);

function solution(distance, rocks, n) {
  let [l, r] = [0, 1_000_000_000];
  let result = 0;

  rocks = rocks.sort((a, b) => a - b);
  rocks.push(distance);

  while (l <= r) {
    const mid = getMid(l, r);

    let passCnt = 0;
    let preRock = 0;
    for (let i = 0; i < rocks.length; i++) {
      const rock = rocks[i];
      if (rock - preRock >= mid) {
        preRock = rock;
        continue;
      } else {
        passCnt++;
      }
    }

    if (passCnt > n) {
      r = mid - 1;
    } else {
      result = Math.max(result, mid);
      l = mid + 1;
    }
  }
  return result;
}
