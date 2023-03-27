function solution(users, emoticons) {
  // 최우선 가입자 최대화!
  // 다음으로 목표액 최대화!

  const n = emoticons.length;
  const combis = [];
  let result = [0, 0];

  const userSignOrBuy = (discountArr) => {
    let signAndBuy = [0, 0];
    for (let i = 0; i < users.length; i++) {
      let price = 0;
      const [wantDiscount, threshold] = users[i];

      for (let j = 0; j < emoticons.length; j++) {
        if (discountArr[j] >= wantDiscount) {
          price += ((100 - discountArr[j]) * emoticons[j]) / 100;
        }
      }
      if (price >= threshold) signAndBuy[0]++;
      else signAndBuy[1] += price;
    }
    return signAndBuy;
  };

  const dfs = (discountArr) => {
    if (discountArr.length === n) {
      const [sign, sum] = userSignOrBuy(discountArr);
      if (result[0] < sign) {
        result = [sign, sum];
      } else if (result[0] === sign && result[1] < sum) {
        result[1] = sum;
      }
      return;
    }
    dfs([...discountArr, 10]);
    dfs([...discountArr, 20]);
    dfs([...discountArr, 30]);
    dfs([...discountArr, 40]);
  };
  dfs([]);
  return result;
}

solution(
  [
    [40, 10000],
    [25, 10000],
  ],
  [7000, 9000]
);
