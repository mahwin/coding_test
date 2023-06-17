const convert = (str) => {
  const cntObj = {};
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i].match(/[a-z]/) && str[i + 1].match(/[a-z]/)) {
      const key = str.slice(i, i + 2);
      cntObj[key] = cntObj[key] ? cntObj[key] + 1 : 1;
    }
  }
  return cntObj;
};

function solution(str1, str2) {
  [str1, str2] = [str1, str2].map((el) => el.toLowerCase());
  const cntObj1 = convert(str1);
  const cntObj2 = convert(str2);
  const unionSet = new Set();
  Object.keys(cntObj1).forEach((key) => unionSet.add(key));
  Object.keys(cntObj2).forEach((key) => unionSet.add(key));
  // 합집합의 갯수
  console.log(unionSet);
  let unionNum = 0;
  [...unionSet].forEach((key) => {
    unionNum += Math.max(cntObj1[key] || 0, cntObj2[key] || 0);
  });
  // 교집합의 개수
  let interNum = 0;
  [...unionSet].forEach((key) => {
    if (cntObj1[key] && cntObj2[key]) {
      interNum += Math.min(cntObj1[key], cntObj2[key]);
    }
  });

  return unionNum > 0 ? Math.floor((interNum / unionNum) * 65536) : 65536;
}
