function solution(k, tangerine) {
  let answer = 0;
  let tangerineSet = new Map();

  tangerine.forEach((tang) => {
    tangerineSet.has(tang)
      ? tangerineSet.set(tang, tangerineSet.get(tang) + 1)
      : tangerineSet.set(tang, 1);
  });
  const tangerineNums = Array.from(tangerineSet.values()).sort((a, b) => b - a);

  for (let num of tangerineNums) {
    answer++;
    k -= num;
    if (k <= 0) break;
  }
  return answer;
}
