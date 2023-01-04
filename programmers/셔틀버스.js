const HMToMin = (HM) => {
  const [H, M] = HM.split(":").map(Number);
  return H * 60 + M;
};

const MinToHM = (M) => {
  let hour = Math.floor(M / 60);
  let min = M - 60 * hour;
  return (
    hour.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0")
  );
};

const canRide = (m, busTime, timetable) => {
  let index = 0;
  while (index < m) {
    if (timetable[index] > busTime) return index;
    index++;
  }
  return m;
};

function solution(n, t, m, timetable) {
  timetable = timetable.map((HM) => HMToMin(HM));
  timetable.sort((a, b) => a - b);
  let busTime = 9 * 60;
  let lastBusTime = 9 * 60 + t * (n - 1);

  for (let i = 0; i < n - 1; i++) {
    let j = 0;
    const ridenPeople = canRide(m, busTime, timetable);
    timetable.splice(0, ridenPeople);
    busTime += t;
    if (timetable.length === 0) return MinToHM(lastBusTime);
  }

  let lastBus = canRide(m, busTime, timetable);

  if (lastBus === m) return MinToHM(timetable[lastBus - 1] - 1);
  else return MinToHM(lastBusTime);
}

console.log(solution(2, 10, 2, ["09:10", "09:09", "08:00"]));
