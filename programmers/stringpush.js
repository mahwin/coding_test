function solution(A, B) {
  let answer = 0;

  if (A === B) return 0;
  while (answer < A.length) {
    answer += 1;
    const A_arr = A.split("");
    const endA = A_arr.pop();
    A = endA[0] + A_arr.join("");
    if (A === B) return answer;
  }

  return -1;
}
