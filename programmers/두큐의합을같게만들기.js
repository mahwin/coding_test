function solution(queue1, queue2) {
  let sum1 = queue1.reduce((p, c) => (p += c), 0);
  let sum2 = queue2.reduce((p, c) => (p += c), 0);
  const len = 3 * queue1.length - 3;
  // A B C D          / E F G H
  // A B C D E F G    / H                   n-1개 이동
  // G                / H A B C D E F       n+n-2개 이동
  //                      합                 3n-3개

  if ((sum1 + sum2) % 2 != 0) return -1;

  // shift 너무 느리니까 push만하면서 idx로 쉬프트한척하자!
  let q1 = 0;
  let q2 = 0;

  for (let i = 0; i <= len; i++) {
    if (sum1 == sum2) return i;
    if (sum1 > sum2) {
      queue2.push(queue1[q1]);
      sum1 -= queue1[q1];
      sum2 += queue1[q1];
      q1++;
    } else {
      queue1.push(queue2[q2]);
      sum2 -= queue2[q2];
      sum1 += queue2[q2];
      q2++;
    }
  }
  return -1;
}
