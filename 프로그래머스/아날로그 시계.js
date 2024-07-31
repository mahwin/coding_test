// 초침이 시침 분침과 겹칠 때마다 알림이 울림
// 동시에 다 겹쳐도 한 번만 울림.

const secDegree = 6;
const minDegree = 1 / 10;
const hDegree = 1 / 120;

const nextClock = (curDegree, degree, factor) => {
  const sumDegree = (curDegree % factor) * degree;
  return sumDegree % 360;
};

const getSec = (h, m, s) => h * 3600 + m * 60 + s;

function solution(h1, m1, s1, h2, m2, s2) {
  const start = getSec(h1, m1, s1);
  const end = getSec(h2, m2, s2);

  let tictok = 0;

  let preSecArrow = null;

  for (let i = start; i <= end; i++) {
    const curSecArrow = nextClock(i, secDegree, 60);
    const curMinArrow = nextClock(i, minDegree, 3600);
    const curHourArrow = nextClock(i, hDegree, 3600 * 12);

    if (i % (3600 * 12) === 0) {
      preSecArrow = 6;
      tictok++;
      continue;
    }

    if (preSecArrow === null) {
      preSecArrow = curSecArrow;
      continue;
    }

    if (
      preSecArrow < curMinArrow &&
      (curSecArrow === 0 || curMinArrow <= curSecArrow)
    ) {
      tictok++;
    }

    if (
      preSecArrow < curHourArrow &&
      (curSecArrow === 0 || curHourArrow <= curSecArrow)
    ) {
      tictok++;
    }

    preSecArrow = curSecArrow;
  }
  return tictok;
}
