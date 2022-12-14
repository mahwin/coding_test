function solution(queue1, queue2) {
  let totalArr = [...queue1, ...queue2];
  let sum = totalArr.reduce((pre, cur) => (pre += cur), 0);
  if (sum % 2 !== 0) return -1;

  let targetSum = sum / 2;
  let maxTrial = queue1.length * 2 + queue1.length + 1;

  let trial = 0;
  let [pointer1, pointer2] = [0, queue1.length];
  sum = queue1.reduce((pre, cur) => (pre += cur), 0);
  while (trial <= maxTrial + 1) {
    if (targetSum > sum) {
      num = totalArr[pointer2];
      pointer2 = pointer2 + 1 === totalArr.length ? 0 : pointer2 + 1;
      sum += num;
    } else if (targetSum < sum) {
      num = totalArr[pointer1];
      pointer1 = pointer1 + 1 === totalArr.length ? 0 : pointer1 + 1;
      sum -= num;
    } else {
      return trial;
    }
    trial++;
  }

  if (trial > maxTrial) return -1;
  else return trial;
}

console.log(solution([1, 1], [1, 5]));
