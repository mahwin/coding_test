function solution(enroll, referral, seller, amount) {
  let incomeMap = new Map();
  enroll.forEach((name) => incomeMap.set(name, 0));

  let graph = {};
  enroll.forEach((name, i) => {
    //추천인 그래프는 단방향임. and 한 명임.
    graph[name] = referral[i];
  });

  for (let i in seller) {
    let [name, price] = [seller[i], amount[i] * 100];

    while (true) {
      let addPrice = Math.ceil(price * 0.9);
      let referralPrice = price - addPrice;

      if (graph[name] === "-") {
        incomeMap.set(name, incomeMap.get(name) + addPrice);
        break;
      } else {
        incomeMap.set(name, incomeMap.get(name) + addPrice);
        price = referralPrice;
      }
      if (referralPrice === 0) break;
      name = graph[name];
    }
  }

  return [...incomeMap.values()];
}

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
  )
);
