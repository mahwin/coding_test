function solution(gems) {
  let result = [1, gems.length];

  let target = new Set(gems).size; // 보석의 종류 저장
  const gemMap = new Map(); // 특정 윈도우 내에 포함되어 있는 보석의 정보 저장 {보성종류:갯수}
  let l = 0;

  for (let r = 0; r < gems.length; r++) {
    const gem = gems[r];
    if (gemMap.has(gem)) gemMap.set(gem, gemMap.get(gem) + 1);
    else gemMap.set(gem, 1);

    if (gemMap.size == target) {
      while (true) {
        const firstGem = gems[l];
        const cnt = gemMap.get(firstGem);
        if (cnt >= 1) {
          if (result[1] - result[0] > r - l) {
            result = [l + 1, r + 1];
          }

          if (cnt - 1 == 0) {
            gemMap.delete(firstGem);
            l++;
            break;
          } else {
            l++;
            gemMap.set(firstGem, cnt - 1);
          }
        }
      }
    } else continue;
  }

  return result;
}

console.log(
  solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])
);

console.log(solution(["A", "B", "B", "B", "B", "B", "B", "C", "B", "A"]));
