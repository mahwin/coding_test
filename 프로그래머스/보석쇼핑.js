function solution(gems) {
  let gemMap = new Map();
  let result = [0, gems.length - 1];
  let [slow, fast] = [0, 0];

  const kindOfGem = new Set([...gems]).size;

  for (let fast = 0; fast < gems.length; fast++) {
    const inGem = gems[fast];
    gemMap.set(inGem, (gemMap.get(inGem) || 0) + 1);

    while (gemMap.size === kindOfGem) {
      if (result[1] - result[0] > fast - slow) {
        result = [slow, fast];
      }

      const outGem = gems[slow++];

      if (gemMap.get(outGem) === 1) {
        gemMap.delete(outGem);
      } else {
        gemMap.set(outGem, gemMap.get(outGem) - 1);
      }
    }
  }

  return result.map((el) => el + 1);
}
