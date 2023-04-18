function solution(targets) {
  let answer = 0;

  targets.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  let pre = 0;

  for (let i = 0; i < targets.length; i++) {
    const [start, end] = targets[i];
    if (start < pre && end > pre) continue;
    else {
      pre = end - 0.5;
      answer++;
    }
  }

  return answer;
}
