let input = `DLIII
MCMXL`.split("\n");

const one = ["V", "L", "D"];
const untilThree = ["I", "X", "C", "M"];
const obj = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
const cObj = {
  M: 1000,
  CM: 900,
  D: 500,
  C: 100,
  XC: 90,
  L: 50,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};
// 1. 오른쪽 숫자가 나보다 작으면 더하기 연산을 한다
// 2. 나보다 크다면 -를 한다. 한번이라도 - 연산을 했다면 똑같은 - 연산은 불가능한다. IV, IX 같이 있을 수 없음

const roma2Decimal = (roma) => {
  let result = 0;
  for (let i = 0; i < roma.length; i++) {
    if (i === roma.length - 1) return result + obj[roma[i]];

    let cur = obj[roma[i]];
    let next = obj[roma[i + 1]];

    if (cur >= next) result += cur;
    else {
      result += next - cur;
      i++;
    }
  }
  return result;
};

const decimal2Roma = (decimal) => {
  let result = "";
  const keys = Object.keys(cObj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const d = Math.floor(decimal / cObj[key]);
    if (d < 4) {
      result += key.repeat(d);
      decimal -= cObj[key] * d;
    } else {
      result += key + keys[i - 1];
      decimal -= cObj[keys[i - 1]] - cObj[key];
    }
  }
  return result;
};

const solution = () => {
  const [roma1, roma2] = input;
  const d1 = roma2Decimal(roma1);
  const d2 = roma2Decimal(roma2);
  const sum = d1 + d2;
  console.log(sum);
  console.log(decimal2Roma(sum));
};

solution();
