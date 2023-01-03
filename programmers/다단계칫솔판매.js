function solution(enroll, referral, seller, amount) {
  let answer = [];

  const incomeMap = new Map();
  enroll.forEach((name) => {
    incomeMap.set(name, 0);
  });

  const graph = {};
  referral.forEach((name, i) => {
    name = name === "-" ? "center" : name;
    graph[enroll[i]] = name;
  });

  const dfs = (name, price) => {
    if (name === "center" || price === 0) {
      return;
    }

    const currentPrice = Math.ceil(price * 0.9);
    const referralPrice = price - currentPrice;
    incomeMap.set(name, incomeMap.get(name) + currentPrice);

    dfs(graph[name], referralPrice);
  };

  for (let i = 0; i < seller.length; i++) {
    const name = seller[i];
    const price = amount[i] * 100;
    dfs(name, price);
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
