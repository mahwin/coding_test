function solution(h1, m1, s1, h2, m2, s2) {
  let cnt = 0;
  let h = h1 * 5 + (m1 / 60) * 5 + (s1 / 3600) * 5;
  let m = m1 + s1 / 60;
  let s = s1;
  const totalSec = (h2 - h1) * 3600 + (m2 - m1) * 60 + s2 - s1;

  for (let sec = 1; sec <= totalSec; sec++) {
    if (m === h) {
      if (s <= h && h <= s + 1) cnt++;
    } else {
      if (s <= h && h <= s + 1) cnt++;
      if (s <= m && m <= s + 1) cnt++;
    }

    h = Math.floor(h + (1 / 3600) * 5) === 60 ? 0 : h + (1 / 3600) * 5;
    m = Math.floor(m + 1 / 60) === 60 ? 0 : m + 1 / 60;
    s = s + 1 === 60 ? 0 : s + 1;
  }
  return cnt;
}
