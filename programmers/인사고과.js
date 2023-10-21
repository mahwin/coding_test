function solution(scores) {
  const wanho = scores[0][0] + scores[0][1]; // 원호의 등수를 구하기 위해

  let grade = 0; //원호보다 합산 점수가 높으면 +1

  //합산 점수가 원호보다 낮으면 논외, 원호 찾기 위해 인덱스 붙임(0)
  let filterScores = [scores[0].concat(0)];
  scores.forEach((el, i) =>
    el[0] + el[1] > wanho ? filterScores.push(el.concat(i)) : null
  );
  filterScores = filterScores.sort((a, b) =>
    a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]
  ); // 내림차순 정렬

  const len = filterScores.length;

  for (let i = 0; i < len; i++) {
    const [s1, s2, idx] = filterScores[i];
    let canRecived = true;
    for (let j = i - 1; j > -1; j--) {
      if (i === j) continue;
      else if (s1 < filterScores[j][0] && s2 < filterScores[j][1]) {
        if (idx === 0) return -1;
        canRecived = false;
        break;
      }
    }
    if (canRecived) grade++;
  }

  return grade;
}

// 9시 10시 단비
// 10시 ~ 12시
