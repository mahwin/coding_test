function solution(sticker) {
  if (sticker.length === 1) return sticker[0];

  const len = sticker.length + 2;
  const dp1 = new Array(len).fill(0);
  const dp2 = new Array(len).fill(0);

  //첫 스티커를 제거, 원형이기 때문에 첫 스티커를 제거했으면 마지막 스티커를 제거할 수 없다.
  for (let i = 2; i < len - 1; i++)
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i - 2]);

  for (let i = 3; i < len; i++)
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i - 2]);

  return Math.max(dp1[len - 2], dp2[len - 1]);
}

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10]));
