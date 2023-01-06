const getPermutation = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const tmp = getPermutation(rest, pick - 1);
    tmp.forEach((p) => result.push([fixed, ...p]));
  });
  return result;
};

function solution(n, weak, dist) {
  let answer = Infinity;
  let needVisitedNum = weak.length;

  for (let i = 0; i < needVisitedNum; i++) {
    // 회전형을 선형적으로
    weak.push(n + weak[i]);
  }

  // 어떤 노동자를 어떤 순서로 투입할지에 대한 정보
  const permutationObj = {};
  for (let pick = 1; pick <= dist.length; pick++) {
    permutationObj[pick] = getPermutation(
      Array.from({ length: dist.length }, (_, i) => i),
      pick
    );
  }

  for (let startIdx = 0; startIdx < n; startIdx++) {
    // 시작하는 외벽
    for (const people of Object.keys(permutationObj)) {
      // 투입되는 노동자 수
      if (people >= answer) break;
      for (const workers of permutationObj[people]) {
        // 투입되는 노동자 순열
        let cnt = 0;
        let copyI = startIdx;
        for (const workerIdx of workers) {
          const worker = dist[workerIdx];
          const start = weak[copyI];
          if (!start) continue;
          while (worker >= weak[copyI] - start) {
            copyI++;
            cnt++;
          }
          if (cnt >= needVisitedNum) answer = Math.min(answer, people);
        }
      }
    }
  }
  return answer === Infinity ? -1 : answer;
}

console.log(solution(12, [1, 5, 6, 10], [7]));
