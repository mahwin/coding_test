function solution(n, times) {
  let left = 1;

  let right = n * times[times.length - 1];
  let result = right;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const people = times.reduce((p, c) => (p += Math.floor(mid / c)), 0);

    if (people >= n) result = Math.min(result, mid);

    if (people >= n) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
}
