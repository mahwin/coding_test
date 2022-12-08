function solution(n, t, m, timetable) {
  const timeToMin = (time) => {
    const [H, M] = time.split(":").map((n) => +n);
    return H * 60 + M;
  };

  const minToTime = (min) => {
    const H = Math.floor(min / 60).toString();
    const M = (min - H * 60).toString();
    return H.padStart(2, "0") + ":" + M.padStart(2, "0");
  };

  timetable.sort((timeA, timeB) => timeToMin(timeB) - timeToMin(timeA)); // 내림차순 정렬
  timetable = timetable.map((time) => timeToMin(time)); //min으로 통일

  let busTime = 9 * 60 - t;

  for (let bus = 0; bus < n; bus++) {
    let busInPeople = [];
    busTime += t;
    for (let people = 0; people < m; people++) {
      if (timetable[timetable.length - 1] <= busTime) {
        busInPeople.push(timetable.pop());
      } else break;
    }
    if (bus === n - 1) {
      return busInPeople.length === m
        ? minToTime(busInPeople[m - 1] - 1)
        : minToTime(busTime);
    }
  }
}

console.log(solution(2, 10, 2, ["09:10", "09:09", "08:00"]));
