function solution(n, lost, reserve) {
  const res = Array.from({ length: n + 1 }, () => false);

  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);

  lost.forEach((n) => {
    if (reserveSet.has(n)) {
      reserveSet.delete(n);
      lostSet.delete(n);
    }
  });
  lost = [...lostSet].sort((a, b) => a - b);
  reserve = [...reserveSet].sort((a, b) => a - b);

  reserve.forEach((num) => (res[num] = true));
  n = n - lost.length;

  for (const l of lost) {
    for (let num = l - 1; num < l + 2; num++) {
      if (res[num]) {
        res[num] = false;
        n++;
        break;
      }
    }
  }
  return n;
}
