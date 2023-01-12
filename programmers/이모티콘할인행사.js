function solution(users, emoticons) {
  const calSignAndPrice = (disArr) => {
    let sign = 0;
    let amount = 0;
    for (let userIdx = 0; userIdx < users.length; userIdx++) {
      let userPrice = 0;
      const [discount, threshold] = users[userIdx];
      for (let i = 0; i < disArr.length; i++) {
        const price = emoticons[i];
        const currntDis = disArr[i];
        if (discount <= currntDis) {
          userPrice += price * 0.01 * (100 - currntDis);
        }
      }
      if (threshold <= userPrice) sign++;
      else amount += userPrice;
    }
    return [sign, amount];
  };
  let answer = [0, 0];

  const dfs = (disArr) => {
    if (disArr.length === emoticons.length) {
      const [sign, total] = calSignAndPrice(disArr);
      if (answer[0] < sign) answer = [sign, total];
      if (answer[0] === sign && total > answer[1]) answer[1] = total;
      return;
    }

    for (let dis of [10, 20, 30, 40]) {
      dfs([...disArr, dis]);
    }
  };

  dfs([]);
  return answer;
}

console.log(
  solution(
    [
      [40, 2900],
      [23, 10000],
      [11, 5200],
      [5, 5900],
      [40, 3100],
      [27, 9200],
      [32, 6900],
    ],
    [1300, 1500, 1600, 4900]
  )
);
