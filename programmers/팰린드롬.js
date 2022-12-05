function solution(s) {
  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.slice(left + 1, right).length;
  };
  let answer = 0;

  //s가 한 글자거나 두 글자인데 aa와 같은 경우엔 그 자체 리턴
  if (s.length < 2 || s === s.split("").reverse().join("")) return s.length;

  for (let i = 0; i < s.length; i++) {
    answer = Math.max(answer, expand(i, i), expand(i, i + 1));
  }
  return answer;
}
