const dividers = (num) => {
  let divi = [];
  for (let i = 1; i <= Math.ceil(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      divi.push(i);
      divi.push(num / i);
    }
  }
  return divi;
};

const CD = (arr, divis) => {
  let commons = [];
  for (let d of divis) {
    let flag = true;
    for (let num of arr) {
      if (num % d !== 0) flag = false;
    }
    if (flag) commons.push(d);
  }
  return commons;
};

const NCD = (arr, divis) => {
  let max = 0;
  for (let d of divis) {
    let flag = true;
    for (let num of arr) {
      if (num % d === 0) flag = false;
    }
    if (flag) {
      max = Math.max(max, d);
    }
  }
  return max;
};

let findMax = (arr) => {
  let max = 0;
  for (let num of arr) {
    if (max < num) max = num;
  }
  return max;
};

function solution1(arrayA, arrayB) {
  const maxANum = findMax(arrayA);
  const maxBNum = findMax(arrayB);

  const divisA = dividers(maxANum);
  const divisB = dividers(maxBNum);
  const commonsA = CD(arrayA, divisA);
  const commonsB = CD(arrayB, divisB);
  const a = NCD(arrayA, commonsB);
  const b = NCD(arrayB, commonsA);
  return a > b ? a : b;
}
