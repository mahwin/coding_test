function solution(today, terms, privacies) {
  const termObj = {};
  let result = [];
  terms.forEach((info) => {
    const [term, duration] = info.split(" ");
    termObj[term] = Number(duration);
  });

  privacies.forEach((priInfo, idx) => {
    const [date, term] = priInfo.split(" ");
    const duration = termObj[term];
    if (!isSaved(today, date, duration)) result.push(idx + 1);
  });
  return result;
}

const isSaved = (today, date, duration) => {
  let [sy, sm, sd] = date.split(".").map(Number);
  const [ty, tm, td] = today.split(".").map(Number);
  sm += duration;

  if (sm % 12 === 0) {
    const addY = Math.floor(sm / 12);
    sm = 12;
    sy += addY - 1;
  } else if (Math.floor(sm / 12)) {
    const addY = Math.floor(sm / 12);
    sm -= addY * 12;
    sy += addY;
  }

  if (ty < sy) return true;
  else if (ty === sy) {
    if (tm < sm) return true;
    else if (tm === sm) {
      if (td < sd) return true;
    }
  }
  return false;
};
