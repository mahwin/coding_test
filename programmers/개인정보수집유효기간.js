const dateAddMonth = (date, month) => {
  let [y, m, d] = date.split(".").map(Number);
  let addY = Math.floor(month / 12);
  y += addY;
  let remainM = month - addY * 12;
  if (m + remainM > 12) {
    y++;
    m = m + remainM - 12;
  } else {
    m += remainM;
  }

  return [y, m, d];
};

function solution(today, terms, privacies) {
  let answer = [];
  let termObj = {};
  terms.forEach((term) => {
    const [t, m] = term.split(" ");
    termObj[t] = Number(m);
  });
  const [ty, tm, td] = today.split(".").map(Number);

  for (let i = 0; i < privacies.length; i++) {
    let dateAndType = privacies[i];
    let [date, type] = dateAndType.split(" ");
    const [y, m, d] = dateAddMonth(date, termObj[type]);
    console.log(y, m, d);
    if (ty > y) answer.push(i + 1);
    else if (ty === y) {
      if (tm > m) answer.push(i + 1);
      else if (tm === m) {
        if (td >= d) answer.push(i + 1);
      }
    }
  }
  return answer;
}
