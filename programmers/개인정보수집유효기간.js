const lastDay = 28;

const dateToDay = (date) => {
  const [y, m, d] = date.split(".").map(Number);
  return y * lastDay * 12 + m * lastDay + d;
};

function solution(today, terms, privacies) {
  const termObj = {};
  const result = [];
  terms.forEach((term) => {
    const [type, duration] = term.split(" ");
    termObj[type] = duration * lastDay;
  });
  const now = dateToDay(today);

  privacies.forEach((privacy, i) => {
    const [date, type] = privacy.split(" ");
    const finishedDay = dateToDay(date) + termObj[type];
    if (finishedDay <= now) result.push(i + 1);
  });
  return result;
}
