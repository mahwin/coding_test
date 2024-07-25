// 완전탐색 같은데 ..?
// dice 10개면 10C5로 선택할 주사위 고르고, 6**5
// 완전탐색으로 6**5 경우의 수를 구하고, 정렬하고 이분 탐색으로 이길 경우의 수를 체크할까?
// 중복 값이 있으니 평범한 이분탐색은 아님. 유니크한 값으로 다루는 대신 중복을 누적합으로 체크하자.

function convert(boolArr) {
  const obj = { pick: [], nonePick: [] };
  boolArr.forEach((el, i) => {
    if (i !== 0) el ? obj.pick.push(i) : obj.nonePick.push(i);
  });
  return obj;
}

function solution(dice) {
  const len = dice.length;
  const half = len / 2;

  const v = Array.from({ length: len + 1 }, () => false);

  const combis = [];
  fillCombis(1, 0);

  let result = { dice: [], winCount: 0 };

  combis.forEach(({ pick, nonePick }) => {
    const sumA = getSumArr(pick).sort((a, b) => a - b);
    const sumB = getSumArr(nonePick).sort((a, b) => a - b);

    const accB = accSumArr(sumB);

    let tmpWin = 0;
    for (let sum of sumA) {
      if (sum <= accB[0][0]) continue;
      const index = bs(sum, accB);

      tmpWin += accB[index][1];
    }

    if (result.winCount < tmpWin) {
      result.dice = pick;
      result.winCount = tmpWin;
    }
  });

  function fillCombis(nextNode, pick) {
    if (pick === half) {
      combis.push(convert(v));
      return;
    }

    for (let i = nextNode; i <= len; i++) {
      if (v[i]) continue;
      v[i] = true;
      fillCombis(i + 1, pick + 1);
      v[i] = false;
    }
  }

  function getSumArr(diceIdxArr) {
    let sumArr = [0];
    diceIdxArr.forEach((diceIdx) => {
      const newSum = [];
      dice[diceIdx - 1].forEach((num) => {
        sumArr.forEach((el) => {
          newSum.push(el + num);
        });
      });
      sumArr = newSum;
    });
    return sumArr;
  }
  // 누적합
  function accSumArr(arr) {
    const numSet = new Set();
    const countObj = {};

    arr.forEach((num) => {
      if (!countObj[num]) countObj[num] = 1;
      else countObj[num]++;
      numSet.add(num);
    });

    const uniqueSortedArr = [...numSet]
      .sort((a, b) => a - b)
      .map((el) => [el, 0]);
    uniqueSortedArr[0][1] = countObj[uniqueSortedArr[0][0]];

    for (let i = 1; i < uniqueSortedArr.length; i++) {
      const num = uniqueSortedArr[i][0];

      uniqueSortedArr[i][1] += uniqueSortedArr[i - 1][1] + countObj[num];
    }

    return uniqueSortedArr;
  }

  function bs(target, arr) {
    let [l, r] = [0, arr.length - 1];
    let index = 0;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);

      const checkNum = arr[mid][0];

      if (checkNum > target) {
        r = mid - 1;
      } else if (checkNum === target) {
        return mid - 1;
      } else {
        index = Math.max(index, mid);
        l = mid + 1;
      }
    }
    return index;
  }

  return result.dice;
}
