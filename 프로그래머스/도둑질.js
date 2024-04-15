function solution(money) {
  const len = money.length;
  const firstPick = Array.from({ length: len - 1 }, () => 0);
  const noFirstPick = Array.from({ length: len }, () => 0);
  firstPick[0] = money[0];

  for (let i = 1; i < len - 1; i++) {
    firstPick[i] = Math.max(firstPick[i - 2] + money[i] || 0, firstPick[i - 1]);
  }
  noFirstPick[1] = money[1];
  for (let i = 2; i < len; i++) {
    noFirstPick[i] = Math.max(
      noFirstPick[i - 2] + money[i],
      noFirstPick[i - 1]
    );
  }

  return Math.max(firstPick.at(-1), noFirstPick.at(-1));
}
