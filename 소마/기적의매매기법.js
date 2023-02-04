let input = `200
100 200 300 400 500 600 700 800 900 500 100 200 300 1`.split("\n");
let money = Number(input[0]);
let prices = input[1].split(" ").map(Number);

let acounts = [
  [money, 0],
  [money, 0],
];

let s = 0;
for (let i = 0; i < prices.length; i++) {
  const price = prices[i];
  //buy and pray
  let [oneMoney, oneCnt] = acounts[0];
  const canbuy = Math.floor(oneMoney / price);
  acounts[0] = [oneMoney - canbuy * price, oneCnt + canbuy];

  //33
  let [twoMoney, twoCnt] = acounts[1];

  if (i === 0 || s === 0) {
    if (prices[i - 1] > prices[i]) s = -1;
    else if (prices[i - 1] < prices[i]) s = 1;
    else s = 0;
  } else {
    if (s > 0 && prices[i - 1] < prices[i]) {
      s++;
    } else if (s < 0 && prices[i - 1] > prices[i]) {
      s--;
    } else {
      if (prices[i - 1] > prices[i]) s = -1;
      else if (prices[i - 1] < prices[i]) s = 1;
      else s = 0;
    }
  }

  if (s === 3) {
    acounts[1] = [twoMoney + price * twoCnt, 0];
  }
  if (s <= -3) {
    const canbuy = Math.floor(twoMoney / price);

    acounts[1] = [twoMoney - canbuy * price, twoCnt + canbuy];
  }
}

let result = [];
for (const [m, c] of acounts) {
  result.push(m + c * prices[13]);
}

if (result[0] > result[1]) console.log("BNP");
else if (result[0] < result[1]) console.log("TIMING");
else console.log("SAMESAME");
