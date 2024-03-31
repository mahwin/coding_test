function solution(food_times, k) {
  let left = 0;
  let right = 100_000_000;
  let targetRotateNum = Infinity;
  k += 1;
  while (left <= right) {
    const rotateNum = Math.floor((left + right) / 2);
    let cnt = cal(food_times, rotateNum);

    if (cnt >= k) {
      right = rotateNum - 1;
      targetRotateNum = Math.min(targetRotateNum, rotateNum);
    } else {
      left = rotateNum + 1;
    }
  }

  let remain = k - cal(food_times, targetRotateNum - 1);

  for (let i = 0; i < food_times.length; i++) {
    if (food_times[i] >= targetRotateNum) remain--;
    if (remain === 0) return i + 1;
  }

  return -1;
}

function cal(food_times, rotateNum) {
  let cnt = 0;
  food_times.forEach((food) => {
    cnt += Math.min(rotateNum, food);
  });
  return cnt;
}
