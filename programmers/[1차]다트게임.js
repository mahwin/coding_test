function solution(dartResult) {
  const result = [0, 0, 0];
  let dartIdx = 0;
  let tmp = "";
  for (let i = 0; i < dartResult.length; i++) {
    const cur = dartResult[i];
    if ("SDT".includes(cur)) {
      let score = Number(tmp);
      score = cur === "D" ? score ** 2 : cur === "T" ? score ** 3 : score;
      result[dartIdx] = score;
      tmp = "";
      dartIdx++;
    } else if ("*#".includes(cur)) {
      if (dartIdx === 1)
        result[0] = cur === "*" ? result[0] * 2 : result[0] * -1;
      else {
        if (cur === "*") {
          result[dartIdx - 1] *= 2;
          result[dartIdx - 2] *= 2;
        } else {
          result[dartIdx - 1] *= -1;
        }
      }
    } else tmp += cur;
  }

  return result.reduce((p, c) => (p += c), 0);
}
