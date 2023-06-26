const binarySearch = (stones, k) => {
  let l = 0;
  let r = 200_000_000;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let cnt = 0; // 몇 명이 건너 뛰었는지 체크
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] - mid <= 0)
        cnt++; // stones[i] > mid면 적어도 한 명이상이 못 건넘
      else cnt = 0;

      if (cnt === k) break;
    }
    if (cnt === k)
      r = mid - 1; // cnt와 k가 같다는 말은 더 적은 수의 친구가 건널 수 있다.
    else l = mid + 1; // cnt가 k보다 작다는 것은 더 많은 수의 친구가 건널 수 있다.
  }
  return l;
};

function solution(stones, k) {
  return binarySearch(stones, k);
}
