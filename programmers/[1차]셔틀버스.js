const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};
const minToTime = (min) => {
  const h = Math.floor(min / 60);
  const m = min - 60 * h;
  return [h.toString().padStart(2, "0"), m.toString().padStart(2, "0")].join(
    ":"
  );
};

function solution(n, t, m, timetable) {
  timetable = timetable.map((time) => timeToMin(time)).sort((a, b) => a - b);

  let peopleIdx = 0;
  let busTime = timeToMin("09:00");
  for (let i = 0; i < n; i++) {
    let ridePeople = 0;
    while (peopleIdx < timetable.length && timetable[peopleIdx] <= busTime) {
      if (ridePeople == m) break;
      ridePeople++;
      peopleIdx++;
    }
    if (i == n - 1) {
      // 마지막 버스인데
      if (ridePeople == m) {
        //사람이 다 탔을 경우 마지막 사람보다 앞에 타야함!!
        return minToTime(timetable[peopleIdx - 1] - 1);
      } else return minToTime(busTime); // 덜 탔다면 버스 시간에 맞춰서 오면 됨.
    }
    busTime += t;
  }
}
