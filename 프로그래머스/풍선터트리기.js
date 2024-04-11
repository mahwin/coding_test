function solution(a) {
  let minLeft = [];
  let minRight = [];
  const len = a.length;

  for (let i = 0; i < len; i++) {
    const left = a[i];
    const right = a[len - i - 1];

    if (minLeft.length === 0) {
      minLeft.push(left);
      minRight.push(right);
      continue;
    }

    if (minLeft.at(-1) < left) {
      minLeft.push(minLeft.at(-1));
    } else minLeft.push(left);

    if (minRight.at(-1) < right) {
      minRight.push(minRight.at(-1));
    } else minRight.push(right);
  }

  minRight = minRight.reverse();

  let result = 0;
  for (let i = 0; i < len; i++) {
    if (i === 0 || i === len - 1) {
      result++;
      continue;
    }
    const current = a[i];
    if (minLeft[i - 1] >= current || minRight[i + 1] >= current) result++;
  }
  return result;
}
