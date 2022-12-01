function solution(gems) {
  let targetCount = new Set(gems).size;
  if (targetCount === 1) return [1, 1];
  let answer = [];
  let min = Infinity;
  let [startPoint, movePoint] = [0, 0];
  let gemMap = new Map();

  while (movePoint < gems.length) {
    gemMap.has(gems[movePoint])
      ? gemMap.set(gems[movePoint], gemMap.get(gems[movePoint]) + 1)
      : gemMap.set(gems[movePoint], 1);
    movePoint++;

    if (gemMap.size === targetCount) {
      while (startPoint < movePoint) {
        if (gemMap.get(gems[startPoint]) > 1) {
          gemMap.set(gems[startPoint], gemMap.get(gems[startPoint]) - 1);
          startPoint++;
        } else if (min > movePoint - startPoint) {
          min = movePoint - startPoint;
          answer = [startPoint + 1, movePoint];
          break;
        } else break;
      }
    }
  }

  return answer;
}

console.log(
  solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])
);
