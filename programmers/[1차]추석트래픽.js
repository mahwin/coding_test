const check = (time, lines) => {
  let cnt = 0;
  let endTime = time + 1;
  for (let i = 0; i < lines.length; i++) {
    const [start, end] = lines[i];
    if (start < endTime && time <= end) cnt++;
  }
  return cnt;
};

const timeToSec = (time) => {
  const [_, date, mili] = time.split(" ");
  const [h, m, s] = date.split(":").map(Number);
  const [end, duration] = [
    h * 3600 + m * 60 + s,
    Number(mili.slice(0, mili.length - 1)),
  ];
  return [Number((end - duration + 0.001).toFixed(3)), end];
};

function solution(lines) {
  lines = lines.map((time) => timeToSec(time));
  let result = -Infinity;

  for (let i = 0; i < lines.length; i++) {
    result = Math.max(result, check(lines[i][0], lines));
    result = Math.max(result, check(lines[i][1], lines));
  }

  return result;
}
