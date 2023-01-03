function solution(gems) {
  let answer = [0, gems.length - 1];
  let amountOfGem = new Set(gems).size;
  let [left, right] = [0, 0];

  let gemCounter = new Map();
  gemCounter.set(gems[0], 1);

  while (left <= right && right < gems.length) {
    if (amountOfGem === gemCounter.size) {
      if (answer[1] - answer[0] > right - left) {
        answer = [left, right];
      }
      const outGem = gems[left];
      if (gemCounter.get(outGem) > 1) {
        gemCounter.set(outGem, gemCounter.get(outGem) - 1);
      } else {
        gemCounter.delete(outGem);
      }
      left++;
    } else {
      right++;
      let inGem = gems[right];
      gemCounter.set(inGem, (gemCounter.get(inGem) || 0) + 1);
    }
  }

  return answer.map((n) => n + 1);
}

console.log(solution(["AA", "AB", "AC", "AA", "AC"]));
