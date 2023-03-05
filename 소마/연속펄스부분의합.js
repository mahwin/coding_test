function solution(sequence) {
  const arr = [];
  for (let i = 0; i < sequence.length; i++) {
    const num = sequence[i];
    if (!arr.length) {
      arr.push(num);
      continue;
    }
    const last = arr[arr.length - 1];
    if (last * num < 0) {
      arr.push(num);
    } else if (num > 0) {
      if (num > last) {
        arr.pop();
        arr.push(num);
      }
    } else {
      if (num < last) {
        arr.pop();
        arr.push(num);
      }
    }
  }

  return arr.reduce((p, c) => (p += Math.abs(c)));
}
