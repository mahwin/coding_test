function solution(relation) {
  const colLen = relation[0].length;
  const rowLen = relation.length;

  const v = Array.from({ length: colLen }, () => false);
  const keys = []; // 백트래킹하면서 저장
  const combis = {}; // key :len value 조합  ex {2 : [[1,2],[2,3]]}

  const isMinimal = (keyList, combi) => {
    for (const arr of keyList) {
      let cnt = 0;
      for (const com of combi) {
        if (arr.includes(com)) cnt++;
      }
      if (cnt === arr.length) return false;
    }

    return true;
  };

  const isUnique = (combi) => {
    // 선택한 키 값으로 만든 값이 유니크 한지 체크
    let set = new Set();
    for (let r = 0; r < rowLen; r++) {
      let tmp = "";
      for (let com of combi) {
        tmp += relation[r][com];
      }
      if (set.has(tmp)) return false;
      set.add(tmp);
    }
    return true;
  };

  const dfs = (node) => {
    // 조합 찾기
    if (keys.length) {
      const key = keys.length;
      combis[key] = combis[key] ? combis[key].concat([[...keys]]) : [[...keys]];
    }

    for (let i = node; i < colLen; i++) {
      if (!v[i]) {
        v[i] = true;
        keys.push(i);
        dfs(i + 1);
        v[i] = false;
        keys.pop();
      }
    }
  };
  dfs(0);

  let result = 0;
  const keyList = [];
  for (let i = 1; i <= colLen; i++) {
    for (const combi of combis[i]) {
      if (isMinimal(keyList, combi) && isUnique(combi)) {
        result++;
        keyList.push(combi);
      }
    }
  }
  return result;
}
console.log(
  solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"],
  ])
);
