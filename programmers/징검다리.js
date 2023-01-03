function solution(stones, k) {
  let [left, right] = [1, 200000000];

  const check = (niniz, jump) => {
    let tmp = 0;
    for (let stone of stones) {
      if (stone <= niniz) {
        tmp++;
      } else {
        tmp = 0;
      }
      if (tmp === jump) return false;
    }
    return true;
  };

  while (left <= right) {
    mid = ((left + right) / 2) >> 0;
    if (check(mid, k)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));
