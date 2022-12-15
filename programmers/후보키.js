const getCombination = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const combinations = [];
  arr.forEach((fixed, index) => {
    let tmpCombis = getCombination(arr.slice(index + 1), pick - 1);
    tmpCombis.forEach((el) => combinations.push([fixed].concat(el)));
  });
  return combinations;
};
const checkUniq = (keyArr) => {
  for (let i = 0; i < keyArr.length; i++) {
    let key = keyArr[i];
    for (let j = i + 1; j < keyArr.length; j++) {
      if (key === keyArr[j]) return false;
    }
  }
  return true;
};

function solution(relation) {
  let answer = 0;
  let visited = [];
  let indexArr = Array.from({ length: relation[0].length }, (_, i) => i);

  for (let pick = 1; pick <= relation[0].length; pick++) {
    let combinations = getCombination(indexArr, pick);
    let checkArr = [];

    newCombinations = combinations.forEach((combination) => {
      checkArr = [];
      relation.forEach((info) => {
        let key = "";
        combination.forEach((index) => (key += info[index]));
        checkArr.push(key);
      });
      if (checkUniq(checkArr)) {
        visited.push([...combination]);
      }
    });
  }
  let deleteSet = new Set();
  for (let i = 0; i < visited.length; i++) {
    for (let j = i + 1; j < visited.length; j++) {
      if (visited[i].filter((v) => !visited[j].includes(v)).length === 0) {
        deleteSet.add(j);
      }
    }
  }

  return visited.length - deleteSet.size;
}

console.log(
  solution([
    ["a", "1", "aaa", "c", "ng"],
    ["a", "1", "bbb", "e", "g"],
    ["c", "1", "aaa", "d", "ng"],
    ["d", "2", "bbb", "d", "ng"],
  ])
);
