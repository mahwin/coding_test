function solution(stones, k) {
  let answer = 0;
  const bs = (left, right) => {
    if (left > right) {
      answer = left;
      return;
    }

    let mid = Math.floor((left + right) / 2);
    for (let i = 0; i <= stones.length - k; i++) {
      for (let slide of stones.slice(i, i + k)) {
        if (mid >= slide) {
          right = mid - 1;
          bs(left, right);
          return;
        }
      }
    }
    left = mid + 1;
    bs(left, right);
    return;
  };

  bs(0, 200000000);
  return answer;
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 1, 1], 1));
