function solution(keymap, targets) {
  let answer = [];

  const keyobj = {};

  keymap.forEach((keys) => {
    keys.split("").forEach((alpha, i) => {
      keyobj[alpha] = keyobj[alpha] ? Math.min(keyobj[alpha], i + 1) : i + 1;
    });
  });

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    let flag = true;
    let cnt = 0;
    for (let j = 0; j < target.length; j++) {
      const key = target[j];
      if (!keyobj[key]) {
        answer.push(-1);
        flag = false;
        break;
      } else cnt += keyobj[key];
    }
    if (flag) answer.push(cnt);
  }
  return answer;
}
