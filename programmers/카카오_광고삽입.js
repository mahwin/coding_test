function solution(play_time, adv_time, logs) {
  let answer = "";

  const timeToSec = (time) => {
    let [H, M, S] = time.split(":");
    return H * 3600 + M * 60 + S;
  };
  let plTime = timeToSec(play_time);
  let adTime = timeToSec(adv_time);

  logs = logs.map((start_end) => {
    const [start, end] = start_end.split("-");
    return [timeToSec(start), timeToSec(end)].map((N) => +N);
  });

  let viewers = Array.from({ length: plTime }, () => 0);

  logs.forEach(([start, end]) => {
    viewers[start] += 1;
    viewers[end] -= 1;
  });

  const viewerSum = (arr) => {
    //시작과 끝 부분만 표시했음 => 시작과 끝 사이도 시청중임.
    for (let i = 1; i < arr.length; i++) {
      arr[i] += arr[i - 1];
    }
    //한 번더 누적하면 끝 - 시작 => 누적 시간
    for (let i = 1; i < arr.length; i++) {
      arr[i] += arr[i - 1];
    }
  };
  viewerSum(viewers);

  let max = -Infinity;
  let targetTime;

  viewers.forEach((view, i) => {
    console.log(view);
    const accTime = viewers[i + adTime] - view;
    if (max < accTime) {
      max = accTime;
      targetTime = i;
    }
  });

  const setToTime = (sec) => {
    let H = Math.floor(sec / 3600);
    sec -= 3600 * H;
    let M = Math.floor(sec / 60);
    let S = sec - M * 60;
    return [
      H.toString().padStart(2, "0"),
      M.toString().padStart(2, "0"),
      S.toString().padStart(2, "0"),
    ].join(":");
  };
  console.log(targetTime);
  return setToTime(targetTime);
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
