function solution(relation) {
  let uniqueSet = new Set();

  const rowLen = relation.length;
  const colLen = relation[0].length;

  for (let i = 1; i < 1 << colLen; i++) {
    let flag = true;
    for (let uniqueKey of uniqueSet) {
      if ((i & uniqueKey) === uniqueKey) {
        flag = false;
        break;
      }
    }

    if (!flag) continue;
    let set = new Set();
    for (let j = 0; j < rowLen; j++) {
      let str = "";
      for (let k = 0; k < colLen; k++) {
        if (i & (1 << k)) str += relation[j][k];
      }
      set.add(str);
    }
    if (set.size === rowLen) {
      uniqueSet.add(i);
    }
  }
  return uniqueSet.size;
}
