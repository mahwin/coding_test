const dateToDay = (date) => {
  const [y, m, d] = date.split(".").map(Number);
  return y * 28 * 12 + m * 28 + d;
};

function solution(today, terms, privacies) {
  const termObj = {};
  terms.forEach((el) => {
    const [type, duration] = el.split(" ");
    termObj[type] = +duration;
  });

  const result = [];
  today = dateToDay(today); // day로 계산.

  privacies.forEach((el, i) => {
    const [date, type] = el.split(" ");
    if (today >= dateToDay(date) + termObj[type] * 28) result.push(i + 1);
  });
  return result;
}
