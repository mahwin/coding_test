function solution(n, t, m, timetable) {
  let answer = "";
  let bus = 9 * 60;

  const timeToMin = (time) => {
    const [H, M] = time.split(":").map((n) => +n);
    return H * 60 + M;
  };

  const minToTime = (min) => {
    let H = Math.floor(min / 60);
    let M = min - H * 60;
    H = H < 10 ? "0" + H : H;
    M = M < 10 ? "0" + M : M;
    return H + ":" + M;
  };

  timetable = timetable.map((time) => timeToMin(time));
  timetable.sort((a, b) => a - b);

  for (let i = 1; i <= n; i++) {
    let peoples = timetable.slice(0, m);
    let ride = 0;
    peoples.forEach((people) => {
      people <= bus ? ride++ : null;
    });
    timetable = timetable.slice(ride);
    //마지막 버스고 인원이 다 찼으면
    if (n === i && m === ride) {
      const lastTime = peoples[peoples.length - 1];
      return minToTime(lastTime - 1);
    } else if (n === i) {
      return minToTime(bus);
    }
    bus += t;
  }

  return answer;
}

console.log(
  solution(10, 60, 45, [
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
    "23:59",
  ])
);
