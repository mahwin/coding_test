const tToM = (time) => {
  const [H, M] = time.split(":").map(Number);
  return H * 60 + M;
};

const mToT = (min) => {
  const H = Math.floor(min / 60);
  const M = min - H * 60;
  return H.toString().padStart(2, "0") + ":" + M.toString().padStart(2, "0");
};

function solution(n, t, m, timetable) {
  timetable = timetable.map((time) => tToM(time));
  timetable.sort((a, b) => a - b);
  let busTime = 9 * 60;

  let peoIdx = 0;

  for (let i = 1; i < n; i++) {
    let cnt = 0;
    while (cnt < m && timetable[peoIdx] <= busTime) {
      peoIdx++;
      cnt++;
    }
    busTime += t;
  }
  console.log(peoIdx);
  if (timetable.length - peoIdx < m) {
    return mToT(busTime);
  } else {
    return mToT(Math.min(timetable[peoIdx + m - 1] - 1, busTime));
  }
}
