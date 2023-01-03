function solution(gems) {
  let gemsLength = gems.length;
  let answer = [0, gemsLength - 1];
  let totalNum = new Set(gems).size;

  let [left, right] = [0, 0];

  let gemCounter = new Map();
  gemCounter.set(gems[0], 1);

  while (left <= right && right <= gemsLength - 1) {
    if (gemCounter.size === totalNum) {
      const outGem = gems[left];
      if (right - left < answer[1] - answer[0]) {
        answer = [left, right];
      }

      if (gemCounter.get(outGem) > 1) {
        gemCounter.set(outGem, gemCounter.get(outGem) - 1);
      } else {
        gemCounter.delete(outGem);
      }
      left++;
    } else {
      right++;
      const inGem = gems[right];
      gemCounter.set(inGem, 1 + (gemCounter.get(inGem) || 0));
    }
  }
  return answer.map((n) => n + 1);
}

console.log(solution(["XYZ", "XYZ", "XYZ"]));
