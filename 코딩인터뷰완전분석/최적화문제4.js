// 긴 문자열 안에 존재하는 짧은 문자열의 모든 순열을 찾아라
const shortString = `abbc`;
const longString = `cbabadcbbabbcbabaabccbabc`;

const addItemDic = (obj, key) => {
  if (obj[key]) {
    obj[key]++;
  } else {
    obj[key] = 1;
  }
};
const deleteDic = (obj, key) => {
  if (obj[key] === 1) {
    delete obj[key];
  } else {
    obj[key]--;
  }
};

const solution = () => {
  // O(s*l)
  let targetObj = {};
  let currentObj = {};

  const s = shortString.length;
  const l = longString.length;

  for (let i = 0; i < s; i++) {
    addItemDic(targetObj, shortString[i]);
  }

  let result = 0;

  for (let i = 0; i < l; i++) {
    if (i + 1 > s) {
      deleteDic(currentObj, longString[i - s]);
    }
    addItemDic(currentObj, longString[i]);
    if (checkSameDic(targetObj, currentObj)) result++;
  }
  return result;
};

function checkSameDic(dic1, dic2) {
  const keys = Object.keys(dic1);
  for (let i = 0; i < keys.length; i++) {
    if (dic1[keys[i]] !== dic2[keys[i]]) {
      return false;
    }
  }
  return true;
}

console.log(solution());
