function solution(msg) {
  let answer = [];

  const items = "abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase();
  let dicMap = new Map();
  for (let i = 1; i < items.length + 1; i++) {
    dicMap.set(items[i - 1], i);
  }

  let maxIdx = msg.length;
  let idx = 0;
  while (idx < maxIdx) {
    let str = "";
    for (let j = idx; j < maxIdx; j++) {
      let key = msg.slice(idx, j + 1);
      if (!dicMap.has(key)) {
        key = msg.slice(idx, j + 1);
        dicMap.set(key, dicMap.size + 1);
        break;
      } else {
        str = key;
      }
    }
    answer.push(dicMap.get(str));
    idx += str.length;
  }
  return answer;
}
