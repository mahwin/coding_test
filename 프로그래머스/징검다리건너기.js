function solution(stones, k) {
  let left = 0;
  let right = 200_000_000 * k;
  let result = 0;

  function check(num) {
    let cnt = 0;

    for (let i = 0; i < stones.length; i++) {
      if (stones[i] >= num) cnt = 0;
      else cnt++;

      if (cnt >= k) return false;
    }
    return true;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      result = Math.max(result, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
