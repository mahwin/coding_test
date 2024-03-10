function solution(a, b, c, d) {
  const diceObj = {};

  for (const num of [a, b, c, d]) {
    if (!diceObj[num]) {
      diceObj[num] = 1;
    } else diceObj[num]++;
  }

  const keys = Object.keys(diceObj).map(Number);
  if (keys.length === 1) return keys[0] * 1111;

  if (keys.length === 2) {
    const [a, b] = keys;

    if (diceObj[a] === 2) {
      return (a + b) * Math.abs(a - b);
    }
    if (diceObj[a] === 3) {
      return (10 * a + b) ** 2;
    } else {
      return (10 * b + a) ** 2;
    }
  }

  if (keys.length === 3) {
    const ks = keys.filter((num) => diceObj[num] !== 2);

    return ks[0] * ks[1];
  }
  if (keys.length === 4) {
    return Math.min(...[a, b, c, d]);
  }
}
