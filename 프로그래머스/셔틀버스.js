function hhmmToMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minToHhmm(min) {
  const h = Math.floor(min / 60);
  const m = min - h * 60;
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
}

function solution(n, t, m, timetable) {
  timetable = timetable.map(hhmmToMin).sort((a, b) => a - b);
  let busTime = hhmmToMin("09:00");

  for (let busIdx = 0; busIdx < n; busIdx++) {
    const ridePeople = [];

    while (
      timetable.length &&
      busTime >= timetable[0] &&
      ridePeople.length < m
    ) {
      ridePeople.push(timetable.shift());
    }
    if (busIdx === n - 1) {
      // 마지막 버스인데 탈 자리가 있다?
      // 해당 버스 도착 시간에 오면됨
      // 없다면 제일 마지막 사람보다 1분 빨리
      if (ridePeople.length < m) {
        return minToHhmm(busTime);
      } else {
        return minToHhmm(ridePeople.at(-1) - 1);
      }
    }

    busTime += t;
  }
}
