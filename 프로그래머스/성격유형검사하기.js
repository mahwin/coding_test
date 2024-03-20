function solution(survey, choices) {
  const types = ["RT", "CF", "JM", "AN"];

  const typeScore = {};
  types.forEach((type) => {
    typeScore[type] = 0;
  });

  for (let i = 0; i < survey.length; i++) {
    const surVeytype = survey[i];
    const pick = choices[i];

    for (const type of types) {
      if (type.includes(surVeytype[0])) {
        typeScore[type] += surVeytype[0] === type[0] ? 4 - pick : pick - 4;
        break;
      }
    }
  }

  return types
    .map((type) => {
      const score = typeScore[type];
      if (score === 0) return type.split("").sort()[0];
      return score > 0 ? type[0] : type[1];
    })
    .join("");
}
