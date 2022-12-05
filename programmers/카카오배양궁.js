function solution(n, info) {
  let answer = [];
  let max = -Infinity;
  const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);
      const attached = combinations.map((el) => [fixed, ...el]);
      results.push(...attached);
    });

    return results;
  };
  let arrowArr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  for (let i = 1; i <= n; i++) {
    let cases = getCombinations(arrowArr, i);
    cases.forEach((arrow) => {
      let ryonInfo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let ryonN = 0;
      arrow.forEach((a) => {
        needArrow = info[a] + 1;
        ryonInfo[a] = needArrow;
        ryonN += needArrow;
      });
      if (ryonN <= n) {
        if (ryonN < n) ryonInfo[10] = n - ryonN;

        let score = 0;
        ryonInfo.forEach((ryon, i) => {
          if (ryon > info[i]) score += 10 - i;
          else if (ryon === 0 && info[i] === 0) {
          } else score = score - (10 - i);
        });

        if (max <= score) {
          max = score;
          answer = [...ryonInfo];
        }
      }
    });
  }
  if (max <= 0) return [-1];
  else return answer;
}

console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
