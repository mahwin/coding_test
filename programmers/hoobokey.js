function solution(relation) {
  let answer = [];

  const keyIdx = relation[0].map((v, i) => i);

  let combinations = [];
  for (let i = 0; i < relation[0].length; i++) {
    combinations.push(...getCombination(keyIdx, i + 1));
  }
  combinations = getUniqueKey(relation, combinations);

  while (combinations.length) {
    answer.push(combinations[0]);
    combinations = combinations.reduce((acc, cur) => {
      let check = combinations[0].every((combi) => cur.includes(combi));
      if (!check) acc.push(cur);
      return acc;
    }, []);
  }

  return answer.length;
}

function getCombination(arr, selectNum) {
  let result = [];
  if (selectNum === 1) {
    return arr.map((a) => [a]);
  }
  arr.forEach((fix, i, origin) => {
    const remain = origin.slice(i + 1);
    const combi = getCombination(remain, selectNum - 1);
    const attach = combi.map((c) => [fix, ...c]);
    result.push(...attach);
  });
  return result;
}

function getUniqueKey(relation, combinations) {
  const uniqueKeys = [];
  combinations.forEach((combination) => {
    let set = new Set();
    relation.forEach((el) => {
      set.add(combination.map((c) => el[c]).join("_"));
    });
    set.size === relation.length ? uniqueKeys.push(combination) : null;
  });
  return uniqueKeys;
}

console.log(
  solution([
    ["a", "aa"],
    ["aa", "a"],
    ["a", "a"],
  ])
);
