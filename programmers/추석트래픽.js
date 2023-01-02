function solution(lines) {
  const formatter = (time) => {
    const [H, M, S] = time.split(":").map(Number);

    return H * 3600 + M * 60 + S;
  };

  const calTime = (sec, taken) => {
    sec *= 1000;
    taken *= 1000;
    return [sec - taken + 1, sec + 999];
  };

  const logInfo = [];

  lines.forEach((line) => {
    const [_, time, taken] = line.split(" ");
    const sec = formatter(time);
    const [start, end] = calTime(sec, taken.slice(0, -1));
    logInfo.push(["start", start]);
    logInfo.push(["end", end]);
  });

  logInfo.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : -1));

  let answer = 0;
  let cnt = 0;
  for (const currentLog of logInfo) {
    if (currentLog[0] === "start") cnt++;
    else cnt--;
    answer = Math.max(answer, cnt);
  }
  return answer;
}
