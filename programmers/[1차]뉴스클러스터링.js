const countObj = (arr) => {
  const obj = {};
  arr.forEach((num) => {
    obj[num] = obj[num] ? obj[num] + 1 : 1;
  });
  return obj;
};
const findUnionSet = (arr1, arr2) => {
  let set = new Set();

  arr1.forEach((num) => set.add(num));
  arr2.forEach((num) => set.add(num));
  return [...set];
};
const splitForJakard = (string) => {
  const stringArr = [];
  let a = 0;
  for (let i = 0; i < string.length - 1; i++) {
    const [a, b] = string
      .slice(i, i + 2)
      .toLowerCase()
      .split("");
    if (a.match(/[a-z]/) && b.match(/[a-z]/)) {
      //둘 다 알파벳이면
      stringArr.push([a, b].join(""));
    }
  }
  return stringArr;
};

function solution(str1, str2) {
  const str1Arr = splitForJakard(str1);
  const str2Arr = splitForJakard(str2);
  const obj1 = countObj(str1Arr);
  const obj2 = countObj(str2Arr);
  let union = findUnionSet(str1Arr, str2Arr);

  let uniCnt = 0;
  let interCnt = 0;
  for (const key of union) {
    if (obj1[key] && obj2[key]) {
      interCnt += Math.min(obj1[key], obj2[key]);
    }
    uniCnt += Math.max(obj1[key] || 0, obj2[key] || 0);
  }

  if (uniCnt == 0 && interCnt == 0) return 65536;
  else return Math.floor((interCnt / uniCnt) * 65536);
}
