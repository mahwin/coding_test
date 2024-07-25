// 어떤 조합으로 낼지, 어떤 카드를 선택할 지 등등...
// 완전 탐색이고 dfs 문제인 것 같음.

function deleteElbyIndexs(arr, ...ids) {
  return arr.filter((_, i) => ids.indexOf(i) === -1);
}

function solution(coin, cards) {
  var answer = 0;

  const lastCardIdx = cards.length;
  const startCardIdx = lastCardIdx / 3;
  const targetNumber = lastCardIdx + 1;

  let newCards;

  let result = 0;
  dfs(cards.slice(0, startCardIdx), coin, 1, startCardIdx);

  function dfs(currentCards, coin, round, cardIdx) {
    result = Math.max(round, result);
    if (cardIdx >= lastCardIdx) return;

    const len = currentCards.length;
    const pickOne = cards[cardIdx];
    const pickTwo = cards[cardIdx + 1];

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (currentCards[i] + currentCards[j] === targetNumber) {
          dfs(
            deleteElbyIndexs(currentCards, i, j),
            coin,
            round + 1,
            cardIdx + 2
          );
          if (coin >= 2) {
            dfs(
              deleteElbyIndexs(currentCards, i, j).concat(pickOne, pickTwo),
              coin - 2,
              round + 1,
              cardIdx + 2
            );
          }
        }
      }
    }

    if (coin >= 2 && pickOne + pickTwo === targetNumber) {
      dfs(currentCards, coin - 2, round + 1, cardIdx + 2);
    }

    if (coin >= 1) {
      for (let i = 0; i < len; i++) {
        if (currentCards[i] + pickOne === targetNumber) {
          dfs(
            deleteElbyIndexs(currentCards, i),
            coin - 1,
            round + 1,
            cardIdx + 2
          );
          if (coin >= 2) {
            let newArr = deleteElbyIndexs(currentCards, i);
            newArr.push(pickOne);
            dfs(newArr, coin - 2, round + 1, cardIdx + 2);
          }
        }

        if (currentCards[i] + pickTwo === targetNumber) {
          dfs(
            deleteElbyIndexs(currentCards, i),
            coin - 1,
            round + 1,
            cardIdx + 2
          );
          if (coin >= 2) {
            let newArr = deleteElbyIndexs(currentCards, i);
            newArr.push(pickOne);
            dfs(newArr, coin - 2, round + 1, cardIdx + 2);
          }
        }
      }
    }
  }
  return result;
}
