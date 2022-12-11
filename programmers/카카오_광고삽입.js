function solution(play_time, adv_time, logs) {
  let answer = "";

  const timeToSec = (time) => {
    let [H, M, S] = time.split(":").map(Number);
    return H * 3600 + M * 60 + S;
  };
  let playTime = timeToSec(play_time);
  let adTime = timeToSec(adv_time);

  let viewers = Array.from({ length: playTime }, () => 0);

  logs = logs.map((start_end) => start_end.split("-").map(timeToSec));

  logs.forEach(([start, end]) => {
    viewers[start] += 1;
    viewers[end] -= 1;
  });

  const viewerSum = (arr) => {
    //시작과 끝 부분만 표시했음 => 시작과 끝 중간도 시청중임.
    for (let i = 1; i < arr.length; i++) {
      arr[i] += arr[i - 1];
    }
    //한 번더 누적 합하면 끝 - 시작 => 누적 시간
    for (let i = 1; i < arr.length; i++) {
      arr[i] += arr[i - 1];
    }
  };
  viewerSum(viewers);

  if (playTime === adTime) return "00:00:00";

  let sum = viewers[adTime - 1];
  let startTime = 0;
  console.log("init", sum);
  for (let i = adTime; i < playTime; i++) {
    const tmpTime = viewers[i] - viewers[i - adTime];

    if (sum < tmpTime) {
      sum = tmpTime;
      startTime = i + 1 - adTime;
    }
  }

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

  return setToTime(startTime);
}
console.log(
  solution("00:10:00", "00:06:30", [
    "00:00:00-00:06:30",
    "00:00:00-00:06:30",
    "00:00:00-00:06:30",
  ])
);
