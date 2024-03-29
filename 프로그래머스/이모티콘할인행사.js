function solution(users, emoticons) {
  const discount = [10, 20, 30, 40];
  const emoticonLen = emoticons.length;
  const userLen = users.length;
  let result = [0, 0];

  const cal = (discountArr) => {
    let signedNumber = 0;
    let money = 0;

    for (const user of users) {
      let tmpMoney = 0;
      for (let i = 0; i < emoticonLen; i++) {
        if (user[0] > discountArr[i]) continue;
        tmpMoney += emoticons[i] * (100 - discountArr[i]) * 0.01;
      }
      if (tmpMoney >= user[1]) {
        signedNumber++;
      } else {
        money += tmpMoney;
      }
    }
    return [signedNumber, money];
  };

  const dfs = (depth, discountArr) => {
    if (depth === emoticonLen) {
      const [n, cost] = cal(discountArr);
      if (result[0] < n) {
        result = [n, cost];
      }
      if (result[0] === n && result[1] < cost) {
        result[1] = cost;
      }
      return;
    }
    for (const dis of discount) {
      dfs(depth + 1, discountArr.concat(dis));
    }
  };
  dfs(0, []);
  return result;
}
