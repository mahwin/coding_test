function calMs(time) {
  let [h, m, secWithMili] = time.split(":");
  let [s, ms] = secWithMili.split(".");
  ms = Number(ms.padEnd(3, "0"));
  [h, m, s] = [h, m, s].map((el) => Number(el) * 1000);

  return h * 3600 + m * 60 + s + ms;
}

function solution(lines) {
  const timeArr = [];

  lines.forEach((line) => {
    const [_, time, duration] = line.split(" ");
    const endTime = Number(calMs(time));
    const startTime =
      endTime - Number(duration.slice(0, duration.length - 1)) * 1000 + 1;

    timeArr.push([startTime, endTime]);
  });

  let result = 0;

  let [windowS, windowE] = [0, 0];

  timeArr.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  for (let i = 0; i < lines.length; i++) {
    // 시작 지점을 기준을 윈도우
    [windowS, windowE] = [timeArr[i][0], timeArr[i][0] + 999];
    let cnt = 1;
    for (let j = i + 1; j < lines.length; j++) {
      const [ts, te] = timeArr[j];
      if (windowS > ts || (windowS <= ts && windowE >= ts)) {
        cnt++;
      }
    }
    result = Math.max(result, cnt);

    cnt = 1;
    // 마지막 지점을 기준으로 윈도우
    [windowS, windowE] = [timeArr[i][1], timeArr[i][1] + 999];
    for (let j = i + 1; j < lines.length; j++) {
      const [ts, te] = timeArr[j];
      if (windowS > ts || (windowS <= ts && windowE >= ts)) {
        cnt++;
      }
    }
    result = Math.max(result, cnt);
  }

  return result;
}
