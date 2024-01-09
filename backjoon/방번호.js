let input = `4
1 5 3 2
1`.split("\n");

const filterInfo = (n, obj) => {
  // 0을 제외한 cost가 가장 낮은 숫자
  // 0을 포함한 cost가 가장 낮은 숫자

  let minIncludeZero = { number: 0, cost: obj[0] };
  let minExcludeZero = { number: 0, cost: Infinity };

  for (let i = 1; i < n; i++) {
    const currentCost = obj[i];
    if (currentCost < minIncludeZero.cost) {
      minIncludeZero = { number: i, cost: currentCost };
    }
    if (currentCost < minExcludeZero.cost) {
      minExcludeZero = { number: i, cost: currentCost };
    }
  }
  return [minIncludeZero.number, minExcludeZero.number];
};

const solution = () => {
  const n = +input[0];
  let money = +input.pop();
  const coinDic = {};
  input[1].split(" ").forEach((cost, i) => (coinDic[i] = +cost));

  const [minIncludeZero, minExcludeZero] = filterInfo(n, coinDic);

  // 가장 싼 값들로 만들어야 최대자릿수임.
  let result = "";
  while (true) {
    if (!result.length) {
      result += minExcludeZero;
      money -= coinDic[minExcludeZero];
      if (money < 0) return 0;
      continue;
    }
    if (money - coinDic[minIncludeZero] < 0) break;
    result += minIncludeZero;
    money -= coinDic[minIncludeZero];
  }
  result = result.split("");

  for (let i = 0; i < result.length; i++) {
    const origin = +result[i];
    const originCost = coinDic[origin];
    for (let j = n - 1; j >= origin; j--) {
      console.log("--");
      console.log(origin, originCost);
      console.log(money, j, coinDic[j]);
      console.log("--");
      if (money - coinDic[j] + originCost >= 0) {
        money -= coinDic[j] - originCost;
        result[i] = j;
        break;
      }
    }
  }
  return result.join("");
};

console.log(solution());
