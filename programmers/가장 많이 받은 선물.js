function solution(friends, gifts) {
  const N = friends.length;
  const countArr = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );

  const giftScore = Array.from({ length: N }, () => 0);

  for (const giftInfo of gifts) {
    const [from, to] = giftInfo.split(" ").map((v) => friends.indexOf(v));
    countArr[from][to]++;
    giftScore[to]--;
    giftScore[from]++;
  }

  let result = 0;
  for (let i = 0; i < N; i++) {
    let getGift = 0;
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const a = countArr[i][j];
      const b = countArr[j][i];

      // 직접 주고 받은 선물 비교
      if (a !== b) {
        if (a > b) {
          getGift++;
        }
      } else if (giftScore[i] > giftScore[j]) {
        getGift++;
      }
    }
    result = Math.max(result, getGift);
  }

  return result;
}
