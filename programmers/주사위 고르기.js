function solution(dice) {
  let result = { cnt: 0, pick: [] };
  const dfs = (next, picks) => {
    if (picks.length === dice.length / 2) {
      const calResult = cal(picks, dice);
      if (result.cnt < calResult.cnt) {
        result.cnt = calResult.cnt;
        result.pick = calResult.pick;
      }
      return;
    }

    for (let i = next; i < dice.length; i++) {
      dfs(i + 1, picks.concat(i));
    }
  };
  dfs(0, []);

  return result.pick.map((el) => el + 1);
}

function cal(aPicks, dice) {
  const bPicks = Array.from({ length: dice.length }, (_, i) => i).filter(
    (el) => !aPicks.includes(el)
  );

  const aSum = getSumArr(aPicks, dice);
  const bSum = getSumArr(bPicks, dice);
  const maxSum = Math.max(...aSum, ...bSum);

  let aAccSum = Array.from({ length: maxSum + 1 }, () => 0);
  let drawCheck = Array.from({ length: maxSum + 1 }, () => 0);

  aSum.forEach((el) => {
    drawCheck[el]++;
    aAccSum[el]++;
  });

  for (let i = 1; i <= maxSum; i++) {
    aAccSum[i] += aAccSum[i - 1];
  }

  let totalSumLength = 6 ** (dice.length / 2);

  let score = { win: 0 };

  for (const b of bSum) {
    const draw = drawCheck[b];
    const aWin = totalSumLength - aAccSum[b] - draw;
    score.win += aWin;
  }

  return { cnt: score.win, pick: aPicks };
}

function getSumArr(picks, dice) {
  let acc = [];
  let tmpAcc = [];

  for (let i = 0; i < picks.length; i++) {
    if (i === 0) {
      acc = [...dice[picks[i]]];
      continue;
    }
    tmpAcc = [];
    dice[picks[i]].forEach((diceItem) => {
      tmpAcc.push(...acc.map((el) => el + diceItem));
    });
    acc = tmpAcc;
  }
  return acc;
}
