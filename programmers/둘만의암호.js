function solution(s, skip, index) {
  let answer = "";

  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const skipSet = new Set(skip);
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    let charIdx = alpha.indexOf(char);
    let cnt = 0;

    while (cnt != index) {
      charIdx = charIdx + 1 === alpha.length ? 0 : charIdx + 1;
      if (!skipSet.has(alpha[charIdx])) cnt++;
    }
    answer += alpha[charIdx];
  }
  return answer;
}
