function solution(cookie) {
  const expand = (point, boundary) => {
    let left = point;
    let right = point + 1;
    let lSum = cookie[left];
    let rSum = cookie[right];
    let result = 0;
    while (left >= 0 && right < boundary) {
      if (lSum > rSum) {
        right++;
        rSum += cookie[right];
      } else if (lSum < rSum) {
        left--;
        lSum += cookie[left];
      } else {
        result = lSum;
        right++;
        left--;
        rSum += cookie[right];
        lSum += cookie[left];
      }
    }

    return result;
  };

  let max = -Infinity;

  for (let point = 0; point < cookie.length; point++) {
    max = Math.max(max, expand(point, cookie.length));
  }

  return max;
}

console.log(solution([1, 1, 2, 3]));
