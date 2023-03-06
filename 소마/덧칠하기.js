function solution(n, m, section) {
  let answer = 0;
  let pointer = 0;

  while (pointer < section.length) {
    answer++;
    const start = section[pointer] + m - 1;
    pointer++;
    while (pointer < section.length && start >= section[pointer]) {
      pointer++;
    }
    if (pointer === section.length) return answer;
  }
}

console.log(solution(8, 4, [2, 3, 6]));
