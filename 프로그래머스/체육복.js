function solution(n, lost, reserve) {
  let start = n - lost.length;

  const set = new Set(reserve);
  const used = Array.from({ lemngth: lost.length }, () => false);
  lost = lost.sort((a, b) => a - b);
  lost.forEach((lo, i) => {
    if (set.has(lo)) {
      set.delete(lo);
      used[i] = true;
      start++;
    }
  });

  for (let i = 0; i < lost.length; i++) {
    if (used[i]) continue;
    const pre = lost[i] - 1;

    if (set.has(pre)) {
      set.delete(pre);
      start++;
      continue;
    }

    const next = lost[i] + 1;
    if (set.has(next)) {
      set.delete(next);
      start++;
    }
  }

  return start;
}
