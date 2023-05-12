function solution(n, m, section) {
  let cnt = 0; //칠한 수
  let p = 0; // 포인터
  while (p < section.length) {
    const until = section[p] + m - 1;
    cnt++;
    while (p < section.length && until >= section[p + 1]) p++;
    p++;
  }
  return cnt;
}
