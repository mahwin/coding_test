function solution(keymap, targets) {
  let alphaCnt = new Map();
  let answer = [];
  for (let i = 0; i < keymap.length; i++) {
    const key = keymap[i];
    for (let j = 0; j < key.length; j++) {
      const alpha = key[j];
      if (alphaCnt.has(alpha)) {
        if (alphaCnt.get(alpha) > j + 1) {
          alphaCnt.set(alpha, j + 1);
        }
      } else {
        alphaCnt.set(alpha, j + 1);
      }
    }
  }

  for (let i = 0; i < targets.length; i++) {
    let tmp = 0;
    const target = targets[i];
    for (let j = 0; j < target.length; j++) {
      const alpha = target[j];
      if (!alphaCnt.has(alpha)) {
        answer.push(-1);
        break;
      }

      tmp += alphaCnt.get(alpha);
    }
    if (answer.length === i + 1) continue;
    answer.push(tmp);
  }

  return answer;
}
