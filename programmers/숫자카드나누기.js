const calDivider = (num) => {
  let nums = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) nums.push(i, num / i);
  }
  return nums.sort((a, b) => b - a);
};

const cal = (nums, arr1, arr2) => {
  for (const num of nums) {
    let flag1 = true;
    for (const num1 of arr1) {
      if (num1 % num !== 0) {
        flag1 = false;
        break;
      }
    }
    if (flag1) {
      let flagB = true;
      for (const num2 of arr2) {
        if (num2 % num === 0) {
          flagB = false;
          break;
        }
      }
      if (flagB) return num;
    }
  }
  return 0;
};

function solution(arrayA, arrayB) {
  const setA = new Set(arrayA);
  const setB = new Set(arrayB);
  const sortedA = [...setA].sort((a, b) => b - a);
  const sortedB = [...setB].sort((a, b) => b - a);
  const numsA = calDivider(sortedA.at(-1));
  const numsB = calDivider(sortedB.at(-1));
  return Math.max(cal(numsA, sortedA, sortedB), cal(numsB, sortedB, sortedA));
}
