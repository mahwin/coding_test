function solution(dots) {
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      if (i === j) continue;
      const 나머지 = [0, 1, 2, 3].filter((idx) => ![i, j].includes(idx));

      if (
        기울기_계산(dots[나머지[0]], dots[나머지[1]]) ===
        기울기_계산(dots[i], dots[j])
      )
        return 1;
    }
  }
  return 0;
}

const 기울기_계산 = (pos1, pos2) => {
  return (pos1[0] - pos2[0]) / (pos1[1] - pos2[1]);
};
