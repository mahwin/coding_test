function logToSec(log) {
  const [h, m, s] = log.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}
function secToLog(sec) {
  const h = Math.floor(sec / 3600);
  sec -= h * 3600;
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return [h, m, s].map((el) => el.toString().padStart(2, "0")).join(":");
}

function solution(play_time, adv_time, logs) {
  const lastTime = logToSec(play_time);
  const advTime = logToSec(adv_time);

  logs = logs.map((logInfo) => {
    const [startLog, endLog] = logInfo.split("-");
    return [logToSec(startLog), logToSec(endLog)];
  });

  const play = Array.from({ length: lastTime + 1 }, () => 0);

  logs.forEach(([start, end]) => {
    play[start]++;
    play[end]--;
  });

  for (let i = 1; i < play.length; i++) {
    play[i] += play[i - 1];
  }

  for (let i = 1; i < play.length; i++) {
    play[i] += play[i - 1];
  }

  let result = 0;
  let viewer = 0;
  for (let i = 0; i <= lastTime - advTime; i++) {
    const curViewer = play[i + advTime - 1] - (play[i - 1] || 0);
    if (viewer < curViewer) {
      viewer = curViewer;
      result = i;
    }
  }

  return secToLog(result);
}
