function solution(targets) {
  targets.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

  let result = 0;
  let pre = 0;

  for (let i = 0; i < targets.length; i++) {
    const [start, end] = targets[i];
    if (start < pre && end > pre) continue;
    else {
      pre = end - 0.5;
      result++;
    }
  }

  return result;
}

function solution2(targets) {
  targets.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let result = 0;
  let pre = -1;

  for (let i = 0; i < targets.length; i++) {
    const [start, end] = targets[i];
    if (pre < start) {
      result++;
      pre = end - 0.5;
    } else {
      pre = Math.min(end - 0.5, pre);
    }
  }
  return result;
}
