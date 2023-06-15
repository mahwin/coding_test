function solution(survey, choices) {
  const surveyElements = ["RT", "TR", "CF", "FC", "JM", "MJ", "AN", "NA"];
  const surveyMap = new Map();
  surveyElements.forEach((name) => surveyMap.set(name, 1));

  survey.forEach((el, i) => {
    surveyMap.set(el, surveyMap.get(el) + 4 - choices[i]);
  });

  const arr = [...surveyMap.entries()];
  let result = "";
  for (let i = 0; i < surveyElements.length; i += 2) {
    if (arr[i][1] >= arr[i + 1][1]) result += arr[i][0][0];
    else result += arr[i + 1][0][0];
  }
  return result;
}
