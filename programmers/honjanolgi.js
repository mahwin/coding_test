function solution(cards) {
  let answer = 0;
  cards = [0, ...cards];
  for (let cardIdx = 1; cardIdx < cards.length; cardIdx++) {
    let card = cards[cardIdx];
    let boxOne = [card];

    while (!boxOne.includes(cards[card])) {
      card = cards[card];
      boxOne.push(card);
    }
    for (let cardIdx = 1; cardIdx < cards.length; cardIdx++) {
      let card = cards[cardIdx];
      if (boxOne.includes(card)) break;
      let boxTwo = [card];
      while (!boxTwo.includes(cards[card])) {
        if (boxOne.includes(card)) break;
        card = cards[card];
        boxTwo.push(card);
      }
      answer = Math.max(answer, boxTwo.length * boxOne.length);
    }
  }
  return answer;
}
