function solution(survey, choices) {
  var answer = "";
  const categories = ["RT", "TR", "CF", "FC", "JM", "MJ", "AN", "NA"];
  const objMap = new Map();
  categories.forEach((cateogry) => {
    objMap.set(cateogry.split("")[0], 0);
  });

  for (let idx = 0; idx < choices.length; idx++) {
    const key = survey[idx].split("")[0];
    objMap.set(key, objMap.get(key) + 4 - choices[idx]);
  }

  const iterator = objMap.entries();

  for (let i = 0; i < 4; i++) {
    const [key, value] = iterator.next().value;
    const [fairKey, fairValue] = iterator.next().value;
    if (value >= fairValue) answer += key;
    else answer += fairKey;
  }

  return answer;
}
