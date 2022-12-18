function solution(strs, t) {
  var answer = Infinity;

  // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
  const min = Math.min(...strs);
  const maxCnt = Math.ceil(strs.length / min);

  const startAlphaObj = {};
  strs.forEach((str) => {
    startAlphaObj[str[0]] = startAlphaObj[str[0]]
      ? [...startAlphaObj[str[0]], str]
      : [str];
  });

  const dfs = (s, cnt, tmp) => {
    if (cnt > maxCnt || cnt > answer) return;
    if (s === t) {
      answer = Math.min(answer, cnt);
      return;
    }
    let nextNode;
    if (s.length === 0) nextNode = startAlphaObj[t[0]];
    else nextNode = startAlphaObj[t[s.length]];

    for (let current of nextNode) {
      if (t.includes(s + current)) {
        tmp.push(current);
        dfs(s + current, cnt + 1, tmp);
      }
    }
  };

  dfs("", 0, []);

  if (answer === Infinity) return -1;
  else return answer;
}
