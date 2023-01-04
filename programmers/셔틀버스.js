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

function solution(n, t, m, timetable) {
  timetable = timetable.map((HM) => HMToMin(HM));
  timetable.sort((a, b) => a - b);
  let busTime = 9 * 60;

  for (let i = 0; i < n - 1; i++) {
    let j = 0;
    while (j < m) {
      if (timetable[j] > busTime) break;
      j++;
    }
    timetable.splice(0, j);
    busTime += t;
  }

  if (timetable.length === 0) return MinToHM(busTime);

  let possible = 0;

  while (possible < m) {
    if (timetable[possible] <= busTime) possible++;
    else break;
  }

  if (possible === m) return MinToHM(timetable[possible - 1] - 1);
  else return MinToHM(busTime);
}

console.log(solution(1, 1, 5, ["00:01", "00:01", "00:01", "00:01", "00:01"]));
