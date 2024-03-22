function solution(str1, str2) {
  return Math.floor(J(str1, str2) * 65536);
}

function isAlpha(char) {
  return /^[a-z]/.test(char);
}

function splitTwoLengthAndFilter(str) {
  let result = [];
  for (let i = 1; i < str.length; i++) {
    if (!isAlpha(str[i - 1]) || !isAlpha(str[i])) continue;
    result.push(str[i - 1] + str[i]);
  }
  return result;
}

function J(str1, str2) {
  const strArr1 = splitTwoLengthAndFilter(str1.toLowerCase());
  const strArr2 = splitTwoLengthAndFilter(str2.toLowerCase());

  const cntObj1 = {};
  const cntObj2 = {};

  const totalSet = new Set();

  strArr1.forEach((str) => {
    cntObj1[str] = cntObj1[str] ? cntObj1[str] + 1 : 1;
    totalSet.add(str);
  });

  strArr2.forEach((str) => {
    cntObj2[str] = cntObj2[str] ? cntObj2[str] + 1 : 1;
    totalSet.add(str);
  });

  let intersec = 0;
  let union = 0;

  if (totalSet.size === 0) return 1;

  [...totalSet].forEach((str) => {
    union += Math.max(cntObj1[str] || 0, cntObj2[str] || 0);
    intersec += Math.min(cntObj1[str] || 0, cntObj2[str] || 0);
  });

  console.log(union, intersec);

  return intersec / union;
}
