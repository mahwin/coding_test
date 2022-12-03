function solution(stones, k) {
  // let right = Math.max(...stones);
  // => 효율성에서 런타임 에러나옴
  let right = 200000000;
  let left = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;
    for (const stone of stones) {
      stone - mid <= 0 ? count++ : (count = 0);
      // num-mid => 0이거나 음수가 k번 만큼 연속하면 그 값 보다 작아야함
      // 그래서 break 걸어서 right = mid-1 을 해서 다시 시도.
      if (count === k) break;
    }
    if (count === k) right = mid - 1;
    else left = mid + 1;
  }
  return left;
}
