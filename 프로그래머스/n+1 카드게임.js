// 기존 카드의 조합으로 N+1을 만들거나
// coin으로 새로운 카드를 하나 얻고, 기존 카드에서 하나 뽑거나
// coin으로 새로운 카드를 두개 얻어서 N+1을 만드는 경우가 존재한다.
// coin으로 카드를 뽑을지 말지는 선택할 경우를 나중으로 미뤄도 된다는 점을 이해하고 문제를 들어가자.
// 각각의 경우를 3개의 배열에 담자.
// 기존 카드에서 버리는 경우를 최우선으로 coin1, coin2 배열로 찾되 남은 코인을 확인하면서 스테이지를 진행하자.

function solution(coin, cards) {
  const LEN = cards.length;
  const TARGET_NUM = LEN + 1;
  const pass = { origin: 0, coin1: 0, coin2: 0 };

  let originSet = new Set();
  let coinSet = new Set();

  for (let i = 0; i < LEN / 3; i++) {
    const card = cards[i];
    if (originSet.has(TARGET_NUM - card)) {
      pass.origin++;
      originSet.delete(TARGET_NUM - card);
    } else originSet.add(card);
  }

  let stage = 0;

  for (let i = LEN / 3; i <= LEN; i += 2) {
    stage++;

    const card1 = cards[i];
    const card2 = cards[i + 1];
    const pair1 = TARGET_NUM - card1;
    const pair2 = TARGET_NUM - card2;

    coinSet.add(card1);
    coinSet.add(card2);

    if (card1 + card2 === TARGET_NUM) {
      pass.coin2++;
    }

    if (coinSet.has(pair1)) {
      coinSet.delete(pair1);
      pass.coin2++;
    }

    if (originSet.has(pair1)) {
      originSet.delete(pair1);
      pass.coin1++;
    }

    if (coinSet.has(pair2)) {
      coinSet.delete(pair2);
      pass.coin2++;
    }

    if (originSet.has(pair2)) {
      originSet.delete(pair2);
      pass.coin1++;
    }

    if (pass.origin > 0) {
      pass.origin--;
      continue;
    }

    if (coin === 0) return stage;

    if (coin > 0 && pass.coin1 > 0) {
      pass.coin1--;
      coin--;
      continue;
    }

    if (coin > 1 && pass.coin2 > 0) {
      pass.coin2--;
      coin -= 2;
      continue;
    }

    break;
  }

  return stage;
}
