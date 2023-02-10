function solution(distance, rocks, n) {
  let [left, right] = [0, distance];
  rocks = rocks.sort((a, b) => a - b);
  rocks.push(distance);
  let answer = 0;
  while (left <= right) {
    let mid = ((left + right) / 2) >> 0;

    let cnt = 0;
    let preRock = 0;
    for (let rock of rocks) {
      if (mid > rock - preRock) {
        cnt++;
      } else {
        preRock = rock;
      }
    }

    if (cnt <= n) {
      left = mid + 1;
      answer = Math.max(mid, answer);
    } else {
      right = mid - 1;
    }
  }
  return answer;
}

solution(25, [2, 14, 11, 21, 17], 2);
