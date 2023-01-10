const timeToSec = (time) => {
  const [H, M, S] = time.split(":").map(Number);
  return H * 3600 + M * 60 + S;
};

const secTotime = (sec) => {
  let H = Math.floor(sec / 3600);
  let M = Math.floor((sec - 3600 * H) / 60);
  let S = sec - 3600 * H - 60 * M;

  H = H.toString().padStart(2, "0");
  M = M.toString().padStart(2, "0");
  S = S.toString().padStart(2, "0");
  return [H, M, S].join(":");
};

function solution(play_time, adv_time, logs) {
  if (play_time === adv_time) return "00:00:00";

  let playTime = timeToSec(play_time);
  let advTime = timeToSec(adv_time);

  let viewers = Array.from({ length: playTime + 1 }, () => 0);

  logs.forEach((start_end) => {
    let [start, end] = start_end.split("-");
    start = timeToSec(start);
    end = timeToSec(end);
    viewers[start] += 1;
    viewers[end] -= 1;
  });

  for (let i = 0; i <= playTime; i++) {
    viewers[i + 1] += viewers[i];
  }
  for (let i = 0; i <= playTime; i++) {
    viewers[i + 1] += viewers[i];
  }
  let sum = viewers[advTime - 1];
  let advStartTime = 0;
  for (let start = 0; start <= playTime - advTime; start++) {
    if (sum < viewers[advTime + start] - viewers[start]) {
      sum = viewers[advTime + start] - viewers[start];
      advStartTime = start + 1;
    }
  }
  return secTotime(advStartTime);
}

console.log(
  solution("02:03:55", "00:14:15", [
    "01:20:15-01:45:14",
    "00:40:31-01:00:00",
    "00:25:50-00:48:29",
    "01:30:59-01:53:29",
    "01:37:44-02:02:30",
  ])
);
