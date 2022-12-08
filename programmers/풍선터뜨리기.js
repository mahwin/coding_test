function solution(a) {
  let answer = 0;
  const aLen = a.length;

  let leftMin = [];
  let leftMinValue = Infinity;
  let rightMin = Array.from({ length: aLen }, () => undefined);
  let rightMinValue = Infinity;

  for (let i = 0; i < aLen; i++) {
    let leftValue = a[i];
    let rightValue = a[aLen - 1 - i];
    if (leftMinValue > leftValue) {
      leftMinValue = leftValue;
    }
    if (rightMinValue > rightValue) {
      rightMinValue = rightValue;
    }

    leftMin.push(leftMinValue);
    rightMin[aLen - 1 - i] = rightMinValue;
  }

  for (let i = 0; i < aLen; i++) {
    if (leftMin[i] >= a[i] || rightMin[i] >= a[i]) {
      answer++;
    }
  }

  return answer;
}

console.log(solution([9, -1, -5]));
