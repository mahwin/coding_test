function solution(enroll, referral, seller, amount) {
  const graph = {};
  const earn = {};

  for (let i = 0; i < enroll.length; i++) {
    graph[enroll[i]] = referral[i];
    earn[enroll[i]] = 0;
    earn[referral[i]] = 0;
  }

  const dfs = (price, name) => {
    if (name === "-") {
      earn[name] += price;
      return;
    }

    const dividePrice = Math.floor(price * 0.1);

    if (dividePrice < 1) {
      earn[name] += price;
      return;
    }

    earn[name] += price - dividePrice;
    dfs(dividePrice, graph[name]);
  };

  for (let i = 0; i < seller.length; i++) {
    const sellerName = seller[i];
    const price = amount[i] * 100;

    dfs(price, sellerName);
  }

  return enroll.map((name) => earn[name]);
}
