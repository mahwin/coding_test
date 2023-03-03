function solution(scoville, k) {
  let i = 0;
  while (true) {
    const sm = scoville.indexOf(Math.min(...scoville));
    const small = scoville[sm];
    if (small >= k) return i;
    scoville.splice(sm, 1);
    const smN = scoville.indexOf(Math.min(...scoville));
    const smallN = scoville[smN];
    scoville.splice(smN, 1);
    scoville.push(small + smallN * 2);
    scoville.push(small + smallN * 2);

    i++;
  }
}
console.log(solution([1, 3, 3, 9, 10, 12], 7));
